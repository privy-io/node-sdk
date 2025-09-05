import { PrivyClient } from '@privy-io/node';
import { generateP256KeyPair } from '../../helpers/authorization-keys';
import { NotFoundError } from '@privy-io/node';

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
        public_keys: [keyPair.publicKey, keyPair2.publicKey],
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
  describe('update', () => {
    it('should update the authorization threshold of a key quorum', async () => {
      const keypair1 = generateP256KeyPair();
      const keypair2 = generateP256KeyPair();

      // Create a 2-of-2 key quorum
      const keyQuorum = await privyClient.keyQuorums().create({
        public_keys: [keypair1.publicKey, keypair2.publicKey],
        display_name: 'NodeSDK KeyQuorums Update Test',
        authorization_threshold: 2,
      });
      expect(keyQuorum.id).toBeDefined();
      expect(keyQuorum.authorization_threshold).toBe(2);

      // Update into a 1-of-2 key quorums
      const keyQuorum2 = await privyClient.keyQuorums().update(keyQuorum.id, {
        authorization_threshold: 1,
        authorization_context: { authorization_private_keys: [keypair1.privateKey, keypair2.privateKey] },
      });
      expect(keyQuorum2.id).toEqual(keyQuorum.id);
      expect(keyQuorum2.authorization_threshold).toBe(1);

      // Update back to a 2-of-2 key quorums
      const keyQuorum3 = await privyClient.keyQuorums().update(keyQuorum.id, {
        authorization_threshold: 2,
        // A single key is sufficient since it's a 1-of-2 key quorum before this update
        authorization_context: { authorization_private_keys: [keypair1.privateKey] },
      });
      expect(keyQuorum3.id).toEqual(keyQuorum.id);
      expect(keyQuorum3.authorization_threshold).toBe(2);
    });
  });
  describe('delete', () => {
    it('should delete a key quorum', async () => {
      const keypair = generateP256KeyPair();
      const createdKeyQuorum = await privyClient.keyQuorums().create({
        public_keys: [keypair.publicKey],
        display_name: 'NodeSDK KeyQuorums Delete Test',
        authorization_threshold: 1,
      });
      expect(createdKeyQuorum.id).toBeDefined();

      // Check that the key quorum exists
      expect(await privyClient.keyQuorums().get(createdKeyQuorum.id)).toMatchObject({
        id: createdKeyQuorum.id,
      });

      const deletedKeyQuorum = await privyClient.keyQuorums().delete(createdKeyQuorum.id, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
      expect(deletedKeyQuorum.success).toBe(true);

      // Check that the key quorum no longer exists
      await expect(() => privyClient.keyQuorums().get(createdKeyQuorum.id)).rejects.toThrow(NotFoundError);
    });
  });
});
