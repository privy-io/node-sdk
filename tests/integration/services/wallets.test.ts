import { secp256k1 } from '@noble/curves/secp256k1';
import { AuthorizationContext } from 'privy-api-client/public-api/AuthorizationContext';
import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { hexToBytes } from 'viem';
import crypto from 'node:crypto';

describe('PrivyWalletsService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  const P256_PUBLIC_KEY = process.env['P256_PUBLIC_KEY']!;
  const P256_PRIVATE_KEY = process.env['P256_PRIVATE_KEY']!;

  const OWNERLESS_TRON_WALLET_ID = process.env['OWNERLESS_TRON_WALLET_ID']!;
  const OWNERLESS_TRON_WALLET_ADDRESS = process.env['OWNERLESS_TRON_WALLET_ADDRESS']!;
  const OWNERLESS_TRON_WALLET_PK = process.env['OWNERLESS_TRON_WALLET_PK']!;
  const P256_OWNED_TRON_WALLET_ID = process.env['P256_OWNED_TRON_WALLET_ID']!;
  const P256_OWNED_TRON_WALLET_ADDRESS = process.env['P256_OWNED_TRON_WALLET_ADDRESS']!;
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
  describe('update', () => {
    it('should be able to change the owner on a wallet', async () => {
      // Check the wallet is ownerless initially
      const wallet1 = await privyClient.wallets().get(OWNERLESS_TRON_WALLET_ID);
      expect(wallet1.owner_id).toBeNull();

      // Update the owner field to a p256 key
      const wallet2 = await privyClient.wallets().update(OWNERLESS_TRON_WALLET_ID, {
        owner: { public_key: P256_PUBLIC_KEY },
      });
      expect(wallet2.owner_id).toBeDefined();

      // Update the wallet back to ownerless
      const wallet3 = await privyClient.wallets().update(OWNERLESS_TRON_WALLET_ID, {
        owner: null,
        authorization_context: p256AuthorizationContext,
      });
      expect(wallet3.owner_id).toBeNull();
    });
  });
  describe('other chains', () => {
    describe('raw sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient.wallets().rawSign(OWNERLESS_TRON_WALLET_ID, {
          params: { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
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
        await privyClient.wallets().rawSign(OWNERLESS_TRON_WALLET_ID, {
          params: { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
          idempotency_key: idempotencyKey,
        });

        const response = await privyClient.wallets().rawSign(OWNERLESS_TRON_WALLET_ID, {
          params: { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
          idempotency_key: idempotencyKey,
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
      it('will fail if the idempotency key is reused with a different body', async () => {
        const idempotencyKey = crypto.randomUUID();
        await privyClient.wallets().rawSign(OWNERLESS_TRON_WALLET_ID, {
          params: { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
          idempotency_key: idempotencyKey,
        });

        await expect(
          privyClient.wallets().rawSign(OWNERLESS_TRON_WALLET_ID, {
            params: { hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321' },
            idempotency_key: idempotencyKey,
          }),
        ).rejects.toThrow(
          `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
        );
      });
      it('should be able to sign a message with an authorization context', async () => {
        const response = await privyClient.wallets().rawSign(P256_OWNED_TRON_WALLET_ID, {
          params: { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
          authorization_context: p256AuthorizationContext,
        });

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
