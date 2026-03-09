import { PrivyClient } from '@privy-io/node';
import { TEST_APP } from '../test-config';

describe('PrivyAppsService', () => {
  let privyClient: PrivyClient;

  beforeAll(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });

  describe('getSettings', () => {
    it('should return app settings with expected fields', async () => {
      const settings = await privyClient.apps().getSettings();
      expect(settings.id).toBe(TEST_APP.id);
      expect(settings.verification_key).toBeDefined();
      expect(typeof settings.name).toBe('string');
    });
  });

  describe('allowlist', () => {
    it('should list allowlist entries', async () => {
      const entries = await privyClient.apps().getAllowlist();
      expect(Array.isArray(entries)).toBe(true);
    });

    it('should invite and remove an allowlist entry (round-trip)', async () => {
      const testEntry = { type: 'email' as const, value: 'integration-test@privy.io' };

      // Invite
      const created = await privyClient.apps().inviteToAllowlist(testEntry);
      expect(created.id).toBeDefined();
      expect(created.value).toBe(testEntry.value);

      // Verify it appears in the list
      const entries = await privyClient.apps().getAllowlist();
      expect(entries.some((e) => e.value === testEntry.value)).toBe(true);

      // Remove
      const deleted = await privyClient.apps().removeFromAllowlist(testEntry);
      expect(deleted.message).toBeDefined();
    });
  });
});
