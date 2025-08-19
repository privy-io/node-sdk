import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';

describe('PrivyWalletsService', () => {
  let privyClient: PrivyClient;
  beforeAll(() => {
    privyClient = PrivyClient.create({
      appId: 'cm0mrhl8o0016smw051sykncb',
      appSecret: '3mnvvLz2jmWXTegeRB3V5U1WyzirAiccHjmdZ87sPbYSykGFhbm2kv4k2Qe8q3yEBghivNCfsyyjGq5tYPWCQ8fL',
      serverUrl: 'https://api.staging.privy.io',
    });
  });
  describe('create', () => {
    it('should be able to create a new ethereum wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'ethereum',
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
  });
});
