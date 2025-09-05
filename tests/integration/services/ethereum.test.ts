import { PrivyAPI } from '@privy-io/node/client';
import { AuthorizationContext, PrivyEthereumService } from '@privy-io/node';
import { PrivyClient } from '@privy-io/node';
import { Hex, verifyHash, verifyMessage, verifyTypedData } from 'viem';
import { verifyAuthorization } from 'viem/utils';
import crypto from 'node:crypto';
import { generateTestJWT } from '../../helpers/jwt-auth';
import { generateP256KeyPair } from '../../helpers/authorization-keys';

describe('PrivyEthereumService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  const P256_PRIVATE_KEY = process.env['P256_PRIVATE_KEY']!;

  const OWNERLESS_ETHEREUM_WALLET_ID = process.env['OWNERLESS_ETHEREUM_WALLET_ID']!;
  const OWNERLESS_ETHEREUM_WALLET_ADDRESS = process.env['OWNERLESS_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_ETHEREUM_WALLET_ID = process.env['P256_OWNED_ETHEREUM_WALLET_ID']!;
  const P256_OWNED_ETHEREUM_WALLET_ADDRESS = process.env['P256_OWNED_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const USER_OWNED_ETHEREUM_WALLET_ID = process.env['USER_OWNED_ETHEREUM_WALLET_ID']!;
  const USER_OWNED_ETHEREUM_WALLET_ADDRESS = process.env['USER_OWNED_ETHEREUM_WALLET_ADDRESS']! as Hex;

  const p256AuthorizationContext: AuthorizationContext = {
    authorization_private_keys: [P256_PRIVATE_KEY],
  };

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_API_URL,
    });
  });
  describe('ethereum', () => {
    describe('personal sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, { message: 'Hello, world!' });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a hex-encoded message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, { message: '0x1234567890' });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          message: { raw: '0x1234567890' },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a byte array message', async () => {
        const message = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, { message });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          message: { raw: message },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with an authorization context', async () => {
        const response = await privyClient.wallets().ethereum().signMessage(P256_OWNED_ETHEREUM_WALLET_ID, {
          message: 'Hello, world!',
          authorization_context: p256AuthorizationContext,
        });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: P256_OWNED_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with a signature provided in the authorization context', async () => {
        const keypair = generateP256KeyPair();

        const wallet = await privyClient.wallets().create({
          chain_type: 'ethereum',
          owner: { public_key: keypair.publicKey },
        });

        const payload = await privyClient.utils().formatRequestForAuthorizationSignature({
          version: 1,
          method: 'POST',
          url: `${TEST_API_URL}/v1/wallets/${wallet.id}/rpc`,
          body: {
            params: { message: 'Hello, world!', encoding: 'utf-8' },
            method: 'personal_sign',
            chain_type: 'ethereum',
          },
          headers: {
            'privy-app-id': TEST_APP_ID,
          },
        });

        const privateKey = crypto.createPrivateKey({
          key: Buffer.from(keypair.privateKey, 'base64'),
          format: 'der',
          type: 'pkcs8',
        });
        const signature = crypto.sign('sha256', payload, privateKey).toString('base64');

        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(wallet.id, {
            message: 'Hello, world!',
            authorization_context: { signatures: [signature] },
          });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: wallet.address as Hex,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with a JWT authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(USER_OWNED_ETHEREUM_WALLET_ID, {
            message: 'Hello, world!',
            authorization_context: {
              user_jwts: [await generateTestJWT()],
            },
          });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: USER_OWNED_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should not allow signing a message when the authorization context is missing', async () => {
        await expect(
          // No authorization context passed in
          privyClient
            .wallets()
            .ethereum()
            .signMessage(P256_OWNED_ETHEREUM_WALLET_ID, { message: 'Hello, world!' }),
        ).rejects.toThrow(PrivyAPI.AuthenticationError);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().ethereum().signMessage(OWNERLESS_ETHEREUM_WALLET_ID, {
          message: 'Hello, world!',
          idempotency_key: idempotencyKey,
        });

        const response = await privyClient.wallets().ethereum().signMessage(OWNERLESS_ETHEREUM_WALLET_ID, {
          message: 'Hello, world!',
          idempotency_key: idempotencyKey,
        });

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().ethereum().signMessage(OWNERLESS_ETHEREUM_WALLET_ID, {
          message: 'Hello, world!',
          idempotency_key: idempotencyKey,
        });

        await expect(
          privyClient.wallets().ethereum().signMessage(OWNERLESS_ETHEREUM_WALLET_ID, {
            message: 'Goodbye, world!',
            idempotency_key: idempotencyKey,
          }),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('secp256k1 sign', () => {
      it('should be able to sign a hash', async () => {
        const hash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        const response = await privyClient
          .wallets()
          .ethereum()
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, { params: { hash } });

        expect(response.signature).toBeDefined();
        const signature = response.signature as Hex;

        const verified = await verifyHash({ hash, signature, address: OWNERLESS_ETHEREUM_WALLET_ADDRESS });
        expect(verified).toBe(true);
      });
      it('should be able to sign a hash with an authorization context', async () => {
        const hash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        const response = await privyClient.wallets().ethereum().signSecp256k1(P256_OWNED_ETHEREUM_WALLET_ID, {
          params: { hash },
          authorization_context: p256AuthorizationContext,
        });

        expect(response.signature).toBeDefined();
        const signature = response.signature as Hex;

        const verified = await verifyHash({ hash, signature, address: P256_OWNED_ETHEREUM_WALLET_ADDRESS });
        expect(verified).toBe(true);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        const hash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        await privyClient
          .wallets()
          .ethereum()
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, { params: { hash }, idempotency_key: idempotencyKey });
        const response = await privyClient
          .wallets()
          .ethereum()
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, { params: { hash }, idempotency_key: idempotencyKey });

        expect(response.signature).toBeDefined();
        const signature = response.signature as Hex;

        const verified = await verifyHash({ hash, signature, address: OWNERLESS_ETHEREUM_WALLET_ADDRESS });
        expect(verified).toBe(true);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        const hash1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        await privyClient
          .wallets()
          .ethereum()
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, {
            params: { hash: hash1 },
            idempotency_key: idempotencyKey,
          });

        const hash2 = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678';
        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, {
              params: { hash: hash2 },
              idempotency_key: idempotencyKey,
            }),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('7702 authorization signing', () => {
      const authorization7702: PrivyEthereumService.Sign7702AuthorizationInput['params'] = {
        contract: '0x1234567890123456789012345678901234567890',
        chain_id: 1,
        nonce: 1,
      };
      it('should be able to sign a 7702 authorization', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, { params: authorization7702 });

        expect(response.authorization).toBeDefined();
        const signedAuthorization = response.authorization;

        const verified = await verifyAuthorization({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          authorization: {
            chainId: signedAuthorization.chain_id as number,
            address: signedAuthorization.contract as Hex,
            nonce: signedAuthorization.nonce as number,
            r: signedAuthorization.r as Hex,
            s: signedAuthorization.s as Hex,
            yParity: signedAuthorization.y_parity,
          },
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a 7702 authorization with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(P256_OWNED_ETHEREUM_WALLET_ID, {
            params: authorization7702,
            authorization_context: p256AuthorizationContext,
          });

        expect(response.authorization).toBeDefined();
        const signedAuthorization = response.authorization;

        const verified = await verifyAuthorization({
          address: P256_OWNED_ETHEREUM_WALLET_ADDRESS,
          authorization: {
            chainId: signedAuthorization.chain_id as number,
            address: signedAuthorization.contract as Hex,
            nonce: signedAuthorization.nonce as number,
            r: signedAuthorization.r as Hex,
            s: signedAuthorization.s as Hex,
            yParity: signedAuthorization.y_parity,
          },
        });
        expect(verified).toBe(true);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().ethereum().sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, {
          params: authorization7702,
          idempotency_key: idempotencyKey,
        });
        const response = await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, {
            params: authorization7702,
            idempotency_key: idempotencyKey,
          });

        expect(response.authorization).toBeDefined();
        const signedAuthorization = response.authorization;

        const verified = await verifyAuthorization({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          authorization: {
            chainId: signedAuthorization.chain_id as number,
            address: signedAuthorization.contract as Hex,
            nonce: signedAuthorization.nonce as number,
            r: signedAuthorization.r as Hex,
            s: signedAuthorization.s as Hex,
            yParity: signedAuthorization.y_parity,
          },
        });
        expect(verified).toBe(true);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().ethereum().sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, {
          params: authorization7702,
          idempotency_key: idempotencyKey,
        });

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, {
              params: { ...authorization7702, contract: '0xabcdef1234abcdef1234abcdef1234abcdef1234' },
              idempotency_key: idempotencyKey,
            }),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('transaction signing', () => {
      const transaction: PrivyEthereumService.SignTransactionInput['params']['transaction'] = {
        type: 2,
        chain_id: 1,
        to: '0x742d35Cc6634C0532925a3b8D1A8a9ff1e7a7A4C',
        value: '0x1',
        gas_limit: '0x5208',
        data: '0x',
      };
      it('should be able to sign a transaction', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, { params: { transaction } });

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('rlp');
        expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('should be able to sign a transaction with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTransaction(P256_OWNED_ETHEREUM_WALLET_ID, {
            params: { transaction },
            authorization_context: p256AuthorizationContext,
          });

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('rlp');
        expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().ethereum().signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
          params: { transaction },
          idempotency_key: idempotencyKey,
        });
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
            params: { transaction },
            idempotency_key: idempotencyKey,
          });

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('rlp');
        expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().ethereum().signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
          params: { transaction },
          idempotency_key: idempotencyKey,
        });

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
              params: { transaction: { ...transaction, to: '0xabcdef1234abcdef1234abcdef1234abcdef1234' } },
              idempotency_key: idempotencyKey,
            }),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('typed data signing', () => {
      const typedData: PrivyEthereumService.SignTypedDataInput['params']['typed_data'] = {
        domain: {
          name: 'Test',
          version: '1',
          chainId: 1,
          verifyingContract: '0x1234567890123456789012345678901234567890',
        },
        primary_type: 'Message' as const,
        types: { Message: [{ name: 'content', type: 'string' }] },
        message: { content: 'Hello world' },
      };
      it('should be able to sign typed data', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, { params: { typed_data: typedData } });

        expect(response.signature).toBeDefined();
        expect(response.encoding).toBe('hex');
        const verified = await verifyTypedData({
          signature: response.signature as Hex,
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          domain: typedData.domain,
          types: typedData.types,
          primaryType: typedData.primary_type,
          message: typedData.message,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign typed data with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTypedData(P256_OWNED_ETHEREUM_WALLET_ID, {
            params: { typed_data: typedData },
            authorization_context: p256AuthorizationContext,
          });

        expect(response.signature).toBeDefined();
        expect(response.encoding).toBe('hex');
        const verified = await verifyTypedData({
          signature: response.signature as Hex,
          address: P256_OWNED_ETHEREUM_WALLET_ADDRESS,
          domain: typedData.domain,
          types: typedData.types,
          primaryType: typedData.primary_type,
          message: typedData.message,
        });
        expect(verified).toBe(true);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .ethereum()
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, {
            params: { typed_data: typedData },
            idempotency_key: idempotencyKey,
          });
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, {
            params: { typed_data: typedData },
            idempotency_key: idempotencyKey,
          });

        expect(response.signature).toBeDefined();
        expect(response.encoding).toBe('hex');
        const verified = await verifyTypedData({
          signature: response.signature as Hex,
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          domain: typedData.domain,
          types: typedData.types,
          primaryType: typedData.primary_type,
          message: typedData.message,
        });
        expect(verified).toBe(true);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .ethereum()
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, {
            params: { typed_data: typedData },
            idempotency_key: idempotencyKey,
          });

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, {
              params: { typed_data: { ...typedData, message: { content: 'A different message' } } },
              idempotency_key: idempotencyKey,
            }),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    // Skipped to not waste funds. Logic is shared with signing transactions so safe to not frequently test.
    describe.skip('transaction sending', () => {
      const transaction: PrivyEthereumService.SendTransactionInput['params']['transaction'] = {
        to: '0x429c8e85D3A18F9F0a64a7A851777e24D591485C', // Some ethereum address
        value: '0x1', // 1 wei
        chain_id: 11_155_111, // sepolia testnet
      };
      it('should be able to send a transaction', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .sendTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
            caip2: 'eip155:11155111',
            params: { transaction },
          });

        expect(response.hash).toBeDefined();
        expect(response.caip2).toBe('eip155:11155111');
        expect(response.hash).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('should be able to sign a 7702 authorization with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .sendTransaction(P256_OWNED_ETHEREUM_WALLET_ID, {
            caip2: 'eip155:11155111',
            params: { transaction },
            authorization_context: p256AuthorizationContext,
          });

        expect(response.hash).toBeDefined();
        expect(response.caip2).toBe('eip155:11155111');
        expect(response.hash).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        const firstTx = await privyClient.wallets().ethereum().sendTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
          caip2: 'eip155:11155111',
          params: { transaction },
          idempotency_key: idempotencyKey,
        });

        const secondTx = await privyClient
          .wallets()
          .ethereum()
          .sendTransaction(OWNERLESS_ETHEREUM_WALLET_ID, {
            caip2: 'eip155:11155111',
            params: { transaction },
            idempotency_key: idempotencyKey,
          });

        expect(firstTx.hash).toEqual(secondTx.hash);
        expect(firstTx.transaction_id).toEqual(secondTx.transaction_id);
      });
    });
  });
});
