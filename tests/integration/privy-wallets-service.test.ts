import { PrivyAPI } from 'privy-api-client/client';
import { secp256k1 } from '@noble/curves/secp256k1';
import { AuthorizationContext } from 'privy-api-client/public-api/AuthorizationContext';
import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { Hex, hexToBytes, verifyHash, verifyMessage, verifyTypedData } from 'viem';
import { verifyAuthorization } from 'viem/utils';
import crypto from 'node:crypto';
import { WalletRpcParams } from 'privy-api-client/resources';

describe('PrivyWalletsService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  const P256_PUBLIC_KEY = process.env['P256_PUBLIC_KEY']!;
  const P256_PRIVATE_KEY = process.env['P256_PRIVATE_KEY']!;

  const OWNERLESS_ETHEREUM_WALLET_ID = process.env['OWNERLESS_ETHEREUM_WALLET_ID']!;
  const OWNERLESS_ETHEREUM_WALLET_ADDRESS = process.env['OWNERLESS_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_ETHEREUM_WALLET_ID = process.env['P256_OWNED_ETHEREUM_WALLET_ID']!;
  const P256_OWNED_ETHEREUM_WALLET_ADDRESS = process.env['P256_OWNED_ETHEREUM_WALLET_ADDRESS']! as Hex;

  const OWNERLESS_SOLANA_WALLET_ID = process.env['OWNERLESS_SOLANA_WALLET_ID']!;
  const OWNERLESS_SOLANA_WALLET_ADDRESS = process.env['OWNERLESS_SOLANA_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_SOLANA_WALLET_ID = process.env['P256_OWNED_SOLANA_WALLET_ID']!;
  const P256_OWNED_SOLANA_WALLET_ADDRESS = process.env['P256_OWNED_SOLANA_WALLET_ADDRESS']! as Hex;

  const OWNERLESS_TRON_WALLET_ID = process.env['OWNERLESS_TRON_WALLET_ID']!;
  const OWNERLESS_TRON_WALLET_ADDRESS = process.env['OWNERLESS_TRON_WALLET_ADDRESS']! as Hex;
  const OWNERLESS_TRON_WALLET_PK = process.env['OWNERLESS_TRON_WALLET_PK']!;
  const P256_OWNED_TRON_WALLET_ID = process.env['P256_OWNED_TRON_WALLET_ID']!;
  const P256_OWNED_TRON_WALLET_ADDRESS = process.env['P256_OWNED_TRON_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_TRON_WALLET_PK = process.env['P256_OWNED_TRON_WALLET_PK']!;

  const p256AuthorizationContext: AuthorizationContext = {
    authorizationPrivateKeys: [P256_PRIVATE_KEY],
  };

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_API_URL,
    });
  });
  describe.skip('create', () => {
    test.each([
      { chainType: 'ethereum', owner: null },
      { chainType: 'ethereum', owner: 'p256' },
      { chainType: 'solana', owner: null },
      { chainType: 'solana', owner: 'p256' },
      { chainType: 'tron', owner: null, hasPublicKey: true },
      { chainType: 'tron', owner: 'p256', hasPublicKey: true },
    ] as const)('.create($chainType, owner:$owner)', async ({ chainType, owner, hasPublicKey }) => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: chainType,
        owner: owner === 'p256' ? { public_key: P256_PUBLIC_KEY } : null,
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.chain_type).toBe(chainType);
      expect(walletResponse.address).toBeDefined();
      hasPublicKey && expect(walletResponse.public_key).toBeDefined();

      // Log the details of the created wallets so it can be added to the envfile
      const OWNER_PREFIX: string = owner === 'p256' ? 'P256_OWNED' : 'OWNERLESS';
      const CHAIN_TYPE: string = chainType.toUpperCase();
      console.log(
        `${OWNER_PREFIX}_${CHAIN_TYPE}_WALLET_ID=${walletResponse.id}` +
          `\n${OWNER_PREFIX}_${CHAIN_TYPE}_WALLET_ADDRESS=${walletResponse.address}` +
          (hasPublicKey ? `\n${OWNER_PREFIX}_${CHAIN_TYPE}_WALLET_PK=${walletResponse.public_key}` : ''),
      );
    });
  });
  describe('ethereum', () => {
    describe('personal sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, 'Hello, world!');

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
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, '0x1234567890');

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
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, message);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: OWNERLESS_ETHEREUM_WALLET_ADDRESS,
          message: { raw: message },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(P256_OWNED_ETHEREUM_WALLET_ID, 'Hello, world!', p256AuthorizationContext);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: P256_OWNED_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should not allow signing a message when the authorization context is missing', async () => {
        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signMessage(P256_OWNED_ETHEREUM_WALLET_ID, 'Hello, world!', undefined),
          //                                                             ^^^^^^^^^
          //                                                             No authorization context passed in
        ).rejects.toThrow(PrivyAPI.AuthenticationError);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, 'Hello, world!', undefined, idempotencyKey);

        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, 'Hello, world!', undefined, idempotencyKey);

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
        await privyClient
          .wallets()
          .ethereum()
          .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, 'Hello, world!', undefined, idempotencyKey);

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signMessage(OWNERLESS_ETHEREUM_WALLET_ID, 'Goodbye, world!', undefined, idempotencyKey),
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
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, hash);

        expect(response.signature).toBeDefined();
        const signature = response.signature as Hex;

        const verified = await verifyHash({ hash, signature, address: OWNERLESS_ETHEREUM_WALLET_ADDRESS });
        expect(verified).toBe(true);
      });
      it('should be able to sign a hash with an authorization context', async () => {
        const hash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        const response = await privyClient
          .wallets()
          .ethereum()
          .signSecp256k1(P256_OWNED_ETHEREUM_WALLET_ID, hash, p256AuthorizationContext);

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
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, hash, undefined, idempotencyKey);
        const response = await privyClient
          .wallets()
          .ethereum()
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, hash, undefined, idempotencyKey);

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
          .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, hash1, undefined, idempotencyKey);

        const hash2 = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678';
        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signSecp256k1(OWNERLESS_ETHEREUM_WALLET_ID, hash2, undefined, idempotencyKey),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('7702 authorization signing', () => {
      const authorization7702: WalletRpcParams.EthereumSign7702AuthorizationRpcInput.Params = {
        contract: '0x1234567890123456789012345678901234567890',
        chain_id: 1,
        nonce: 1,
      };
      it('should be able to sign a 7702 authorization', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, authorization7702);

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
          .sign7702Authorization(P256_OWNED_ETHEREUM_WALLET_ID, authorization7702, p256AuthorizationContext);

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
        await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, authorization7702, undefined, idempotencyKey);
        const response = await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, authorization7702, undefined, idempotencyKey);

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
        await privyClient
          .wallets()
          .ethereum()
          .sign7702Authorization(OWNERLESS_ETHEREUM_WALLET_ID, authorization7702, undefined, idempotencyKey);

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .sign7702Authorization(
              OWNERLESS_ETHEREUM_WALLET_ID,
              {
                ...authorization7702,
                contract: '0xabcdef1234abcdef1234abcdef1234abcdef1234',
              },
              undefined,
              idempotencyKey,
            ),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('transaction signing', () => {
      const transaction: WalletRpcParams.EthereumSignTransactionRpcInput.Params.Transaction = {
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
          .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, transaction);

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('rlp');
        expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('should be able to sign a transaction with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTransaction(P256_OWNED_ETHEREUM_WALLET_ID, transaction, p256AuthorizationContext);

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('rlp');
        expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .ethereum()
          .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, transaction, undefined, idempotencyKey);
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, transaction, undefined, idempotencyKey);

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('rlp');
        expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .ethereum()
          .signTransaction(OWNERLESS_ETHEREUM_WALLET_ID, transaction, undefined, idempotencyKey);

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signTransaction(
              OWNERLESS_ETHEREUM_WALLET_ID,
              { ...transaction, to: '0xabcdef1234abcdef1234abcdef1234abcdef1234' },
              undefined,
              idempotencyKey,
            ),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
    describe('typed data signing', () => {
      const typedData: WalletRpcParams.EthereumSignTypedDataRpcInput.Params.TypedData = {
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
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, typedData);

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
          .signTypedData(P256_OWNED_ETHEREUM_WALLET_ID, typedData, p256AuthorizationContext);

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
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, typedData, undefined, idempotencyKey);
        const response = await privyClient
          .wallets()
          .ethereum()
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, typedData, undefined, idempotencyKey);

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
          .signTypedData(OWNERLESS_ETHEREUM_WALLET_ID, typedData, undefined, idempotencyKey);

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signTypedData(
              OWNERLESS_ETHEREUM_WALLET_ID,
              { ...typedData, message: { content: 'A different message' } },
              undefined,
              idempotencyKey,
            ),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
  });
  describe('other chains', () => {
    describe('raw sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient.wallets().rawSign(OWNERLESS_TRON_WALLET_ID, {
          hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        });

        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${OWNERLESS_TRON_WALLET_PK}`);

        const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .rawSign(
            OWNERLESS_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            undefined,
            idempotencyKey,
          );

        const response = await privyClient
          .wallets()
          .rawSign(
            OWNERLESS_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            undefined,
            idempotencyKey,
          );
        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${OWNERLESS_TRON_WALLET_PK}`);

        const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .rawSign(
            OWNERLESS_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            undefined,
            idempotencyKey,
          );

        await expect(
          privyClient
            .wallets()
            .rawSign(
              OWNERLESS_TRON_WALLET_ID,
              { hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321' },
              undefined,
              idempotencyKey,
            ),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
      it('should be able to sign a message with an authorization context', async () => {
        const response = await privyClient
          .wallets()
          .rawSign(
            P256_OWNED_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            p256AuthorizationContext,
          );

        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${P256_OWNED_TRON_WALLET_PK}`);

        const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
    });
  });
});
