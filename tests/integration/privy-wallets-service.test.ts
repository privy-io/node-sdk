import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';

describe('PrivyWalletsService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_APP_SERVER_URL = process.env['TEST_APP_SERVER_URL']!;

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
