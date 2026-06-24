import { PrivyClient } from '@privy-io/node';
import { setupTestWalletResources, TestWalletResources } from '../test-setup';

describe('PrivySwapsService', () => {
  let resources: TestWalletResources;
  let privyClient: PrivyClient;
  let walletId: string;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    privyClient = resources.client;

    const wallet = await privyClient.wallets().create({ chain_type: 'ethereum' });
    walletId = wallet.id;
  });

  describe('quote', () => {
    it.skip('should get a swap quote for an EVM token pair', async () => {
      const quote = await privyClient.wallets().swaps().quote(walletId, {
        base_amount: '1000000000000000000',
        source: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: '0x0000000000000000000000000000000000000001',
          caip2: 'eip155:8453',
        },
        amount_type: 'exact_input',
      });

      expect(quote.input_amount).toBeDefined();
      expect(quote.est_output_amount).toBeDefined();
      expect(quote.input_token).toBe('native');
      expect(quote.output_token).toBe('0x0000000000000000000000000000000000000001');
      expect(quote.minimum_output_amount).toBeDefined();
    });

    it.skip('should get a swap quote with slippage tolerance', async () => {
      const quote = await privyClient.wallets().swaps().quote(walletId, {
        base_amount: '1000000',
        source: {
          asset_address: '0x0000000000000000000000000000000000000001',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        slippage_bps: 100,
      });

      expect(quote.input_amount).toBeDefined();
      expect(quote.est_output_amount).toBeDefined();
      expect(quote.minimum_output_amount).toBeDefined();
    });

    it.skip('should get a cross-chain swap quote', async () => {
      const quote = await privyClient.wallets().swaps().quote(walletId, {
        base_amount: '1000000000000000000',
        source: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: 'native',
          caip2: 'eip155:42161',
        },
        amount_type: 'exact_input',
      });

      expect(quote.input_amount).toBeDefined();
      expect(quote.est_output_amount).toBeDefined();
      expect(quote.destination_caip2).toBe('eip155:42161');
    });
  });

  describe('execute', () => {
    it.skip('should execute a swap on EVM', async () => {
      const result = await privyClient.wallets().swaps().execute(walletId, {
        base_amount: '1000000000000000000',
        source: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: '0x0000000000000000000000000000000000000001',
          caip2: 'eip155:8453',
        },
        amount_type: 'exact_input',
        slippage_bps: 50,
      });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('swap');
      expect(result.wallet_id).toBe(walletId);
      expect(result.input_token).toBe('native');
      expect(result.output_token).toBe('0x0000000000000000000000000000000000000001');
      expect(result.status).toBeDefined();
    });

    it.skip('should execute a swap with authorization context', async () => {
      const ownedWallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: resources.p256KeyPair.publicKey },
      });

      const result = await privyClient.wallets().swaps().execute(ownedWallet.id, {
        base_amount: '1000000000000000000',
        source: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: '0x0000000000000000000000000000000000000001',
          caip2: 'eip155:8453',
        },
        amount_type: 'exact_input',
        slippage_bps: 50,
        authorization_context: {
          authorization_private_keys: [resources.p256KeyPair.privateKey],
        },
      });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('swap');
      expect(result.wallet_id).toBe(ownedWallet.id);
    });

    it.skip('should execute a swap with idempotency key', async () => {
      const idempotencyKey = `swap-${crypto.randomUUID()}`;

      const result = await privyClient.wallets().swaps().execute(walletId, {
        base_amount: '1000000000000000000',
        source: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: '0x0000000000000000000000000000000000000001',
          caip2: 'eip155:8453',
        },
        amount_type: 'exact_input',
        slippage_bps: 50,
        idempotency_key: idempotencyKey,
      });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('swap');
    });

    it.skip('should execute a cross-chain swap', async () => {
      const result = await privyClient.wallets().swaps().execute(walletId, {
        base_amount: '1000000000000000000',
        source: {
          asset_address: 'native',
          caip2: 'eip155:8453',
        },
        destination: {
          asset_address: 'native',
          caip2: 'eip155:42161',
        },
        amount_type: 'exact_input',
        slippage_bps: 100,
      });

      expect(result.id).toBeDefined();
      expect(result.type).toBe('swap');
      expect(result.destination_caip2).toBe('eip155:42161');
    });
  });
});
