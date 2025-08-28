import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { derPublicKeyToPem, generateP256KeyPair } from '../../helpers/authorization-keys';

describe('PrivyKeyQuorumsService', () => {
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
    it('should create a key quorum with a two public keys', async () => {
      const keyPair = generateP256KeyPair();
      const keyPair2 = generateP256KeyPair();
      const keyQuorum = await privyClient.keyQuorums().create({
        public_keys: [derPublicKeyToPem(keyPair.publicKey), derPublicKeyToPem(keyPair2.publicKey)],
        display_name: '2 of 2 Test Key Quorum',
        authorization_threshold: 2,
      });

      expect(keyQuorum.id).toBeDefined();
      expect(keyQuorum.display_name).toBe('2 of 2 Test Key Quorum');
      expect(keyQuorum.authorization_threshold).toBe(2);
      expect(keyQuorum.authorization_keys).toEqual([
        expect.objectContaining({ public_key: keyPair.publicKey }),
        expect.objectContaining({ public_key: keyPair2.publicKey }),
      ]);
    });
  });
});
