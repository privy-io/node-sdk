import { PrivyClient } from '@privy-io/node';
import { cleanupTestWalletResources, setupTestWalletResources, TestWalletResources } from '../test-setup';

const QUOTE_INPUT = {
  base_amount: '1000000000000000000',
  source: { asset_address: 'native', caip2: 'eip155:8453' },
  destination: { asset_address: '0x0000000000000000000000000000000000000001', caip2: 'eip155:8453' },
  amount_type: 'exact_input',
} as const;

const VAULT_ID = 'cm7oxq1el000e11o8iwp7d0d0';

// Skipped like the existing swap and earn tests in swaps.test.ts and wallets.test.ts, which are not
// run against staging and would move funds. They serve as contract tests for the per-call
// request_expiry option and are still type-checked.
describe('request expiry on swaps and earn', () => {
  let resources: TestWalletResources;
  let privyClient: PrivyClient;
  let walletId: string;
  let authorizationContext: { authorization_private_keys: string[] };

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    privyClient = resources.client;

    const wallet = await privyClient.wallets().create({
      chain_type: 'ethereum',
      owner: { public_key: resources.p256KeyPair.publicKey },
    });
    walletId = wallet.id;
    authorizationContext = { authorization_private_keys: [resources.p256KeyPair.privateKey] };
  });

  afterAll(async () => {
    if (resources !== undefined) await cleanupTestWalletResources(resources);
  });

  describe.skip('swaps', () => {
    it('should get a quote with a per-call request_expiry', async () => {
      const quote = await privyClient
        .wallets()
        .swaps()
        .quote(walletId, {
          ...QUOTE_INPUT,
          request_expiry: Date.now() + 20 * 60 * 1000,
          authorization_context: authorizationContext,
        });

      expect(quote.input_amount).toBeDefined();
    });

    it('should reject a quote with an expired request_expiry', async () => {
      await expect(
        privyClient
          .wallets()
          .swaps()
          .quote(walletId, {
            ...QUOTE_INPUT,
            request_expiry: Date.now() - 60 * 1000,
            authorization_context: authorizationContext,
          }),
      ).rejects.toThrow();
    });

    it('should execute a swap with a per-call request_expiry', async () => {
      const result = await privyClient
        .wallets()
        .swaps()
        .execute(walletId, {
          ...QUOTE_INPUT,
          slippage_bps: 50,
          request_expiry: Date.now() + 20 * 60 * 1000,
          authorization_context: authorizationContext,
        });

      expect(result.id).toBeDefined();
    });

    it('should reject a swap with an expired request_expiry', async () => {
      await expect(
        privyClient
          .wallets()
          .swaps()
          .execute(walletId, {
            ...QUOTE_INPUT,
            slippage_bps: 50,
            request_expiry: Date.now() - 60 * 1000,
            authorization_context: authorizationContext,
          }),
      ).rejects.toThrow();
    });
  });

  describe.skip('earn', () => {
    it('should deposit with a per-call request_expiry', async () => {
      const response = await privyClient
        .wallets()
        .earn()
        .ethereum()
        .deposit(walletId, {
          vault_id: VAULT_ID,
          amount: '1.0',
          request_expiry: Date.now() + 20 * 60 * 1000,
          authorization_context: authorizationContext,
        });

      expect(response).toBeDefined();
    });

    it('should reject a deposit with an expired request_expiry', async () => {
      await expect(
        privyClient
          .wallets()
          .earn()
          .ethereum()
          .deposit(walletId, {
            vault_id: VAULT_ID,
            amount: '1.0',
            request_expiry: Date.now() - 60 * 1000,
            authorization_context: authorizationContext,
          }),
      ).rejects.toThrow();
    });

    it('should reject a withdrawal with an expired request_expiry', async () => {
      await expect(
        privyClient
          .wallets()
          .earn()
          .ethereum()
          .withdraw(walletId, {
            vault_id: VAULT_ID,
            amount: '1.0',
            request_expiry: Date.now() - 60 * 1000,
            authorization_context: authorizationContext,
          }),
      ).rejects.toThrow();
    });

    it('should reject an incentive claim with an expired request_expiry', async () => {
      await expect(
        privyClient
          .wallets()
          .earn()
          .ethereum()
          .incentive()
          .claim(walletId, {
            chain: 'base',
            request_expiry: Date.now() - 60 * 1000,
            authorization_context: authorizationContext,
          }),
      ).rejects.toThrow();
    });
  });
});
