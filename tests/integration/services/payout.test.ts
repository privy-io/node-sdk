import { PrivyClient } from '@privy-io/node';
import { setupTestWalletResources, TestWalletResources } from '../test-setup';

describe('PrivyPayoutFiatService', () => {
  let resources: TestWalletResources;
  let privyClient: PrivyClient;
  let walletId: string;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    privyClient = resources.client;

    const wallet = await privyClient.wallets().create({ chain_type: 'ethereum' });
    walletId = wallet.id;
  });

  describe('create', () => {
    it.skip('should initiate a fiat payout from a wallet', async () => {
      const result = await privyClient
        .wallets()
        .payout()
        .fiat()
        .create(walletId, {
          source: {
            amount: '10.00',
            asset: 'usdc',
            chain: 'base',
          },
          destination: {
            fiat_account_id: 'fiat_account_id',
          },
        });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('payout');
      expect(result.wallet_id).toBe(walletId);
      expect(result.status).toBeDefined();
    });

    it.skip('should initiate a fiat payout with authorization context', async () => {
      const ownedWallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: resources.p256KeyPair.publicKey },
      });

      const result = await privyClient
        .wallets()
        .payout()
        .fiat()
        .create(ownedWallet.id, {
          source: {
            amount: '10.00',
            asset: 'usdc',
            chain: 'base',
          },
          destination: {
            fiat_account_id: 'fiat_account_id',
          },
          authorization_context: {
            authorization_private_keys: [resources.p256KeyPair.privateKey],
          },
        });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('payout');
      expect(result.wallet_id).toBe(ownedWallet.id);
    });

    it.skip('should initiate a fiat payout with idempotency key', async () => {
      const idempotencyKey = `payout-${crypto.randomUUID()}`;

      const result = await privyClient
        .wallets()
        .payout()
        .fiat()
        .create(walletId, {
          source: {
            amount: '10.00',
            asset: 'usdc',
            chain: 'base',
          },
          destination: {
            fiat_account_id: 'fiat_account_id',
          },
          idempotency_key: idempotencyKey,
        });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('payout');
    });
  });
});
