import { secp256k1 } from '@noble/curves/secp256k1';
import { PrivyClient } from '@privy-io/node';
import { base58, base64, hex } from '@scure/base';
import { mnemonicToSeed } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';

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

      const exported = await privyClient.wallets().exportPrivateKey(wallet.id, {
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

      const exported = await privyClient.wallets().exportPrivateKey(wallet.id, {
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
    it('should be able to export a seed phrase for a Solana wallet', async () => {
      const keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'solana',
        owner: { public_key: keypair.publicKey },
      });
      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('solana');

      const exported = await privyClient.wallets().exportSeedPhrase(wallet.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(exported.seed_phrase).toBeDefined();
      const words = exported.seed_phrase.split(' ');
      expect(words.length).toBeGreaterThanOrEqual(12);
      expect(words.length).toBeLessThanOrEqual(24);
      for (const word of words) {
        expect(word).toMatch(/^[a-z]+$/);
      }

      // Verify the seed phrase produces the correct Solana address
      const seed = await mnemonicToSeed(exported.seed_phrase);
      const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;
      // Create keypair from the 32-byte private key
      const solanaKeypair = Keypair.fromSeed(new Uint8Array(derivedSeed));
      const solanaAddress = solanaKeypair.publicKey.toBase58();

      expect(solanaAddress).toBe(wallet.address);
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

      const exported = await privyClient.wallets().exportPrivateKey(wallet.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(exported.private_key).toBeDefined();
      const privateKey = hex.decode(exported.private_key);

      // The public_key we got on creation matches what is derived from the exported private_key
      expect(secp256k1.getPublicKey(privateKey, true)).toEqual(publicKey);
    });
    it('should be able to export a seed phrase for an Ethereum wallet', async () => {
      const keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: keypair.publicKey },
      });
      expect(wallet.id).toBeDefined();
      expect(wallet.chain_type).toBe('ethereum');

      const exported = await privyClient.wallets().exportSeedPhrase(wallet.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(exported.seed_phrase).toBeDefined();
      const words = exported.seed_phrase.split(' ');
      expect(words.length).toBeGreaterThanOrEqual(12);
      expect(words.length).toBeLessThanOrEqual(24);
      for (const word of words) {
        expect(word).toMatch(/^[a-z]+$/);
      }

      const mnemonicAccount = mnemonicToAccount(exported.seed_phrase);
      expect(mnemonicAccount.address).toBe(wallet.address);
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
      });
    });
  });

  // Skipped because we don't want to actually transfer funds, but test serves as contract test.
  describe.skip('transfer', () => {
    let ethWallets: TestWallet[];

    beforeAll(async () => {
      ethWallets = await createTestWallets(resources, 'ethereum');
    });

    it('should be able to transfer tokens', async () => {
      const wallet = ethWallets[0]!;
      const response = await privyClient.wallets().transfer(wallet.id, {
        source: {
          asset: 'usdc',
          amount: '0.01',
          chain: 'base',
        },
        destination: {
          address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2',
        },
        ...(wallet.authorizationContext && {
          authorization_context: wallet.authorizationContext,
        }),
      });

      expect(response).toBeDefined();
    });
  });

  // Skipped because we don't want to actually deposit funds, but test serves as contract test.
  describe.skip('earn deposit', () => {
    let ethWallets: TestWallet[];

    beforeAll(async () => {
      ethWallets = await createTestWallets(resources, 'ethereum');
    });

    it('should be able to deposit into a vault', async () => {
      const wallet = ethWallets[0]!;
      const response = await privyClient
        .wallets()
        .earn()
        .ethereum()
        .deposit(wallet.id, {
          vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
          amount: '1.0',
          idempotency_key: 'earn-deposit-idempotency-key',
          ...(wallet.authorizationContext && {
            authorization_context: wallet.authorizationContext,
          }),
        });

      expect(response).toBeDefined();
    });
  });

  // Skipped because we don't want to actually withdraw funds, but test serves as contract test.
  describe.skip('earn withdraw', () => {
    let ethWallets: TestWallet[];

    beforeAll(async () => {
      ethWallets = await createTestWallets(resources, 'ethereum');
    });

    it('should be able to withdraw from a vault', async () => {
      const wallet = ethWallets[0]!;
      const response = await privyClient
        .wallets()
        .earn()
        .ethereum()
        .withdraw(wallet.id, {
          vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
          amount: '1.0',
          idempotency_key: 'earn-withdraw-idempotency-key',
          ...(wallet.authorizationContext && {
            authorization_context: wallet.authorizationContext,
          }),
        });

      expect(response).toBeDefined();
    });
  });

  // Skipped because we don't want to actually claim incentives, but test serves as contract test.
  describe.skip('earn incentive claim', () => {
    let ethWallets: TestWallet[];

    beforeAll(async () => {
      ethWallets = await createTestWallets(resources, 'ethereum');
    });

    it('should be able to claim incentive rewards', async () => {
      const wallet = ethWallets[0]!;
      const response = await privyClient
        .wallets()
        .earn()
        .ethereum()
        .incentive()
        .claim(wallet.id, {
          chain: 'base',
          ...(wallet.authorizationContext && {
            authorization_context: wallet.authorizationContext,
          }),
        });

      expect(response).toBeDefined();
    });
  });
});
