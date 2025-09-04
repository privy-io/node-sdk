import { PrivyClient } from '@privy-io/node';

describe('PrivyUsersService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_API_URL,
    });
  });
  describe.skip('create', () => {
    it('should create a user with a linked email account and a wallet', async () => {
      const user = await privyClient.users().create({
        linked_accounts: [{ type: 'email', address: 'batman@privy.io' }],
        wallets: [{ chain_type: 'ethereum' }],
        custom_metadata: {
          key: 'value',
        },
      });

      expect(user.id).toBeDefined();
      expect(user.linked_accounts).toEqual([
        expect.objectContaining({ type: 'email', address: 'batman@privy.io' }),
        expect.objectContaining({ type: 'wallet', chain_type: 'ethereum' }),
      ]);
      expect(user.custom_metadata).toEqual({ key: 'value' });
    });
  });
});
