import { PrivyAPI } from 'privy-api-client/client';
import { secp256k1 } from '@noble/curves/secp256k1';
import { AuthorizationContext } from 'privy-api-client/public-api/AuthorizationContext';
import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { Hex, hexToBytes, verifyMessage } from 'viem';
import crypto from 'node:crypto';

describe('PrivyWalletsService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_APP_SERVER_URL = process.env['TEST_APP_SERVER_URL']!;
  const FUNDED_ETHEREUM_WALLET_ID = process.env['FUNDED_ETHEREUM_WALLET_ID']!;
  const FUNDED_ETHEREUM_WALLET_ADDRESS = process.env['FUNDED_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_ETHEREUM_WALLET_ID = process.env['P256_OWNED_ETHEREUM_WALLET_ID']!;
  const P256_OWNED_ETHEREUM_WALLET_ADDRESS = process.env['P256_OWNED_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const FUNDED_TRON_WALLET_ID = process.env['FUNDED_TRON_WALLET_ID']!;
  const FUNDED_TRON_WALLET_PK = process.env['FUNDED_TRON_WALLET_PK']!;
  const FUNDED_TRON_WALLET_ADDRESS = process.env['FUNDED_TRON_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_TRON_WALLET_ID = process.env['P256_OWNED_TRON_WALLET_ID']!;
  const P256_OWNED_TRON_WALLET_PK = process.env['P256_OWNED_TRON_WALLET_PK']!;
  const P256_OWNED_TRON_WALLET_ADDRESS = process.env['P256_OWNED_TRON_WALLET_ADDRESS']! as Hex;
  const P256_PRIVATE_KEY = process.env['P256_PRIVATE_KEY']!;
  const P256_PUBLIC_KEY = process.env['P256_PUBLIC_KEY']!;

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_APP_SERVER_URL,
    });
  });
  describe.skip('create', () => {
    it('should be able to create a new ethereum wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'ethereum',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('ethereum');
    });
    it('should be able to create a new ethereum wallet owned by a p256 key pair', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: P256_PUBLIC_KEY },
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('ethereum');
    });
    it('should be able to create a new solana wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'solana',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('solana');
    });
    it('should be able to create a new tron wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'tron',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('tron');
    });
    it('should be able to create a new tron wallet owned by a p256 key pair', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'tron',
        owner: { public_key: P256_PUBLIC_KEY },
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('tron');
    });
  });
  describe('ethereum', () => {
    describe('personal sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, 'Hello, world!');

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a hex-encoded message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, '0x1234567890');

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
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
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, message);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
          message: { raw: message },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with an authorization context', async () => {
        // Set up the authorization context
        const authorizationContext: AuthorizationContext = {
          authorizationPrivateKeys: [P256_PRIVATE_KEY],
        };

        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(P256_OWNED_ETHEREUM_WALLET_ID, 'Hello, world!', authorizationContext);

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
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, 'Hello, world!', undefined, idempotencyKey);

        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, 'Hello, world!', undefined, idempotencyKey);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
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
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, 'Hello, world!', undefined, idempotencyKey);

        await expect(
          privyClient
            .wallets()
            .ethereum()
            .signMessage(FUNDED_ETHEREUM_WALLET_ID, 'Goodbye, world!', undefined, idempotencyKey),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
    });
  });
  describe('other chains', () => {
    describe('raw sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient.wallets().rawSign(FUNDED_TRON_WALLET_ID, {
          hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        });

        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${FUNDED_TRON_WALLET_PK}`);

        const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
      it('will succeed if the idempotency key is reused with the same body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .rawSign(
            FUNDED_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            undefined,
            idempotencyKey,
          );

        const response = await privyClient
          .wallets()
          .rawSign(
            FUNDED_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            undefined,
            idempotencyKey,
          );
        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${FUNDED_TRON_WALLET_PK}`);

        const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient
          .wallets()
          .rawSign(
            FUNDED_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            undefined,
            idempotencyKey,
          );

        await expect(
          privyClient
            .wallets()
            .rawSign(
              FUNDED_TRON_WALLET_ID,
              { hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321' },
              undefined,
              idempotencyKey,
            ),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
      it('should be able to sign a message with an authorization context', async () => {
        // Set up the authorization context
        const authorizationContext: AuthorizationContext = {
          authorizationPrivateKeys: [P256_PRIVATE_KEY],
        };

        const response = await privyClient
          .wallets()
          .rawSign(
            P256_OWNED_TRON_WALLET_ID,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            authorizationContext,
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
