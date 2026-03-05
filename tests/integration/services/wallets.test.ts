import { secp256k1 } from '@noble/curves/secp256k1';
import { PrivyClient } from '@privy-io/node';
import { base58, base64, hex } from '@scure/base';
import crypto from 'node:crypto';
import nacl from 'tweetnacl';
import { hexToBytes, verifyMessage } from 'viem';
import {
  english,
  generateMnemonic,
  generatePrivateKey,
  mnemonicToAccount,
  privateKeyToAccount,
} from 'viem/accounts';
import { generateP256KeyPair } from '@privy-io/node';
import {
  setupTestWalletResources,
  createTestWallets,
  cleanupTestWalletResources,
  TestWalletResources,
  TestWallet,
  WALLET_CASES,
} from '../test-setup';

describe('PrivyWalletsService', () => {
  let resources: TestWalletResources;
  let privyClient: PrivyClient;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    privyClient = resources.client;
  });

  afterAll(async () => {
    if (resources) await cleanupTestWalletResources(resources);
  });

  describe('create idempotency', () => {
    it('will succeed if the idempotency key is reused with the same body', async () => {
      const idempotencyKey = crypto.randomUUID();
      const response1 = await privyClient.wallets().create({
        chain_type: 'ethereum',
        idempotency_key: idempotencyKey,
      });
      expect(response1.id).toBeDefined();
      expect(response1.chain_type).toBe('ethereum');
      expect(response1.address).toBeDefined();

      const response2 = await privyClient.wallets().create({
        chain_type: 'ethereum',
        idempotency_key: idempotencyKey,
      });
      expect(response2.id).toBe(response1.id);
    });
    it('will fail if the idempotency key is reused with a different body', async () => {
      const idempotencyKey = crypto.randomUUID();
      await privyClient.wallets().create({
        chain_type: 'ethereum',
        idempotency_key: idempotencyKey,
      });

      await expect(
        privyClient.wallets().create({
          chain_type: 'solana',
          idempotency_key: idempotencyKey,
        }),
      ).rejects.toThrow(
        `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
      );
    });
  });
  describe('update', () => {
    it('should be able to change the owner on a wallet', async () => {
      const wallet = await privyClient.wallets().create({ chain_type: 'tron' });

      // Check the wallet is ownerless initially
      const wallet1 = await privyClient.wallets().get(wallet.id);
      expect(wallet1.owner_id).toBeNull();

      // Update the owner field to a p256 key
      const wallet2 = await privyClient.wallets().update(wallet.id, {
        owner: { public_key: resources.p256KeyPair.publicKey },
      });
      expect(wallet2.owner_id).toBeDefined();

      // Update the wallet back to ownerless
      const wallet3 = await privyClient.wallets().update(wallet.id, {
        owner: null,
        authorization_context: { authorization_private_keys: [resources.p256KeyPair.privateKey] },
      });
      expect(wallet3.owner_id).toBeNull();
    });
  });
  describe('export', () => {
    it('should be able to export an Ethereum wallet', async () => {
      const keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: keypair.publicKey },
      });
      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('ethereum');

      const exported = await privyClient.wallets().export(wallet.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(exported.private_key).toBeDefined();
      expect(exported.private_key.length).toBe(64);
      // Private key is returned as hex without 0x prefix
      expect(exported.private_key).toMatch(/^[0-9a-f]{64}$/);

      const viemWallet = privateKeyToAccount(`0x${exported.private_key}`);
      expect(viemWallet.address).toBe(wallet.address);
    });
    it('should be able to export a Solana wallet', async () => {
      const keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'solana',
        owner: { public_key: keypair.publicKey },
      });
      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('solana');

      const exported = await privyClient.wallets().export(wallet.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(exported.private_key).toBeDefined();
      const privateKey = base58.decode(exported.private_key);
      expect(privateKey.length).toBe(64);

      // Validate a signature with the key corresponds to the wallet address
      const message = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const signature = nacl.sign.detached(message, privateKey);
      const verified = nacl.sign.detached.verify(message, signature, base58.decode(wallet.address));
      expect(verified).toBe(true);
    });
    it('should be able to export a Tier 2 wallet', async () => {
      const keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'tron',
        owner: { public_key: keypair.publicKey },
      });
      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('tron');
      expect(wallet.public_key).toBeDefined();

      const publicKey = hex.decode(wallet.public_key!);

      const exported = await privyClient.wallets().export(wallet.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(exported.private_key).toBeDefined();
      const privateKey = hex.decode(exported.private_key);

      // The public_key we got on creation matches what is derived from the exported private_key
      expect(secp256k1.getPublicKey(privateKey, true)).toEqual(publicKey);
    });
  });
  describe('import', () => {
    it('should be able to import an Ethereum wallet', async () => {
      // Generate an ethereum wallet external to Privy
      const walletPrivateKey = generatePrivateKey();
      const viemWallet = privateKeyToAccount(walletPrivateKey);

      // Generate a p256 keypair to own the wallet
      const keypair = await generateP256KeyPair();

      const wallet = await privyClient.wallets().import({
        wallet: {
          entropy_type: 'private-key',
          chain_type: 'ethereum',
          address: viemWallet.address,
          private_key: hexToBytes(walletPrivateKey),
        },
        owner: { public_key: keypair.publicKey },
      });

      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('ethereum');
      expect(wallet.address).toBe(viemWallet.address);

      const { signature } = await privyClient
        .wallets()
        .ethereum()
        .signMessage(wallet.id, {
          message: 'Hello, world!',
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        });
      expect(signature).toBeDefined();
      expect(signature).toMatch(/^0x[0-9a-f]+$/);

      const verified = await verifyMessage({
        address: viemWallet.address,
        message: 'Hello, world!',
        signature: signature as `0x${string}`,
      });
      expect(verified).toBe(true);
    });
    it('should be able to import an Ethereum wallet by mnemonic and HD index', async () => {
      // Generate an ethereum wallet external to Privy
      const mnemonic = generateMnemonic(english);
      const viemWallet = mnemonicToAccount(mnemonic, { addressIndex: 2 });

      // Generate a p256 keypair to own the wallet
      const keypair = await generateP256KeyPair();

      const wallet = await privyClient.wallets().import({
        wallet: {
          entropy_type: 'hd',
          chain_type: 'ethereum',
          address: viemWallet.address,
          private_key: mnemonic,
          index: 2,
        },
        owner: { public_key: keypair.publicKey },
      });

      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('ethereum');
      expect(wallet.address).toBe(viemWallet.address);

      const { signature } = await privyClient
        .wallets()
        .ethereum()
        .signMessage(wallet.id, {
          message: 'Hello, world!',
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        });
      expect(signature).toBeDefined();
      expect(signature).toMatch(/^0x[0-9a-f]+$/);

      const verified = await verifyMessage({
        address: viemWallet.address,
        message: 'Hello, world!',
        signature: signature as `0x${string}`,
      });
      expect(verified).toBe(true);
    });
    it('should be able to import a Solana wallet', async () => {
      // Generate a solana wallet external to Privy
      const walletKeypair = nacl.sign.keyPair();
      const walletPrivateKey = walletKeypair.secretKey;
      const walletAddress = base58.encode(walletKeypair.publicKey);

      // Generate a p256 keypair to own the wallet
      const keypair = await generateP256KeyPair();

      const wallet = await privyClient.wallets().import({
        wallet: {
          entropy_type: 'private-key',
          chain_type: 'solana',
          address: walletAddress,
          private_key: walletPrivateKey,
        },
        owner: { public_key: keypair.publicKey },
      });

      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('solana');
      expect(wallet.address).toBe(walletAddress);

      const message = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const { signature } = await privyClient
        .wallets()
        .solana()
        .signMessage(wallet.id, {
          message,
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        });
      expect(signature).toBeDefined();

      const verified = await nacl.sign.detached.verify(
        message,
        base64.decode(signature),
        base58.decode(walletAddress),
      );
      expect(verified).toBe(true);
    });
  });
  describe('other chains', () => {
    let tronWallets: TestWallet[];

    beforeAll(async () => {
      tronWallets = await createTestWallets(resources, 'tron');
    });

    describe('raw sign', () => {
      describe.each(WALLET_CASES)('$ownership', ({ index }) => {
        it('should be able to sign a message', async () => {
          const wallet = tronWallets[index]!;
          const response = await privyClient.wallets().rawSign(wallet.id, {
            params: {
              hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            },
            ...(wallet.authorizationContext && {
              authorization_context: wallet.authorizationContext,
            }),
          });

          expect(response.encoding).toBe('hex');
          expect(response.signature).toBeDefined();
          expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

          const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
          const signatureBytes = hexToBytes(response.signature as `0x${string}`);
          const publicKeyBytes = hexToBytes(`0x${wallet.publicKey}`);

          const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
          expect(verified).toBe(true);
        });

        it('will succeed if the idempotency key is reused with the same body', async () => {
          const wallet = tronWallets[index]!;
          const idempotencyKey = crypto.randomUUID();
          await privyClient.wallets().rawSign(wallet.id, {
            params: {
              hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            },
            idempotency_key: idempotencyKey,
            ...(wallet.authorizationContext && {
              authorization_context: wallet.authorizationContext,
            }),
          });

          const response = await privyClient.wallets().rawSign(wallet.id, {
            params: {
              hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            },
            idempotency_key: idempotencyKey,
            ...(wallet.authorizationContext && {
              authorization_context: wallet.authorizationContext,
            }),
          });
          expect(response.encoding).toBe('hex');
          expect(response.signature).toBeDefined();
          expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

          const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
          const signatureBytes = hexToBytes(response.signature as `0x${string}`);
          const publicKeyBytes = hexToBytes(`0x${wallet.publicKey}`);

          const verified = secp256k1.verify(signatureBytes, hashBytes, publicKeyBytes);
          expect(verified).toBe(true);
        });

        it('will fail if the idempotency key is reused with a different body', async () => {
          const wallet = tronWallets[index]!;
          const idempotencyKey = crypto.randomUUID();
          await privyClient.wallets().rawSign(wallet.id, {
            params: {
              hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            },
            idempotency_key: idempotencyKey,
            ...(wallet.authorizationContext && {
              authorization_context: wallet.authorizationContext,
            }),
          });

          await expect(
            privyClient.wallets().rawSign(wallet.id, {
              params: {
                hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
              },
              idempotency_key: idempotencyKey,
              ...(wallet.authorizationContext && {
                authorization_context: wallet.authorizationContext,
              }),
            }),
          ).rejects.toThrow(
            `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
          );
        });
      });
    });
  });
});
