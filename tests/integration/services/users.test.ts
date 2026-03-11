import { PrivyClient } from '@privy-io/node';
import { TEST_APP } from '../test-config';

describe('PrivyUsersService', () => {
  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });
  describe('create', () => {
    it('should create a user with a linked email account and a wallet', async () => {
      const user = await privyClient.users().create({
        linked_accounts: [{ type: 'email', address: 'batman@privy.io' }],
        wallets: [{ chain_type: 'ethereum' }],
        custom_metadata: {
          key: 'value',
        },
      });

      expect(user.id).toBeDefined();
      expect(user.linked_accounts).toHaveLength(2);
      expect(user.linked_accounts).toContainEqual(
        expect.objectContaining({ type: 'email', address: 'batman@privy.io' }),
      );
      expect(user.linked_accounts).toContainEqual(
        expect.objectContaining({ type: 'wallet', chain_type: 'ethereum' }),
      );
      expect(user.custom_metadata).toEqual({ key: 'value' });

      await privyClient.users().delete(user.id);
    });
  });
});
