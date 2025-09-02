import { PrivyClient } from '@privy-io/node/public-api/PrivyClient';
import { generateP256KeyPair } from '../../helpers/authorization-keys';

describe('PrivyPoliciesService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  const OWNERLESS_ETHEREUM_POLICY_ID = process.env['OWNERLESS_ETHEREUM_POLICY_ID']!;

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_API_URL,
    });
  });
  describe.skip('create', () => {
    it('should create a policy', async () => {
      const policy = await privyClient.policies().create({
        version: '1.0',
        name: 'Native token transfer maximums',
        chain_type: 'ethereum',
        rules: [
          {
            name: 'Restrict ETH transfers to a maximum value',
            method: 'eth_sendTransaction',
            conditions: [
              {
                field_source: 'ethereum_transaction',
                field: 'value',
                operator: 'lte',
                value: '0x2386F26FC10000',
              },
            ],
            action: 'ALLOW',
          },
        ],
      });

      expect(policy.id).toBeDefined();
      expect(policy.name).toBe('Native token transfer maximums');
      expect(policy.chain_type).toBe('ethereum');
      expect(policy.rules).toEqual([
        expect.objectContaining({
          name: 'Restrict ETH transfers to a maximum value',
          method: 'eth_sendTransaction',
        }),
      ]);
    });
  });
  describe('update', () => {
    it('should be able to change the owner on a policy', async () => {
      const keypair = generateP256KeyPair();

      // Check the policy is ownerless initially
      const policy1 = await privyClient.policies().get(OWNERLESS_ETHEREUM_POLICY_ID);
      expect(policy1.owner_id).toBeNull();

      // Update the owner field to a p256 key
      const policy2 = await privyClient.policies().update(OWNERLESS_ETHEREUM_POLICY_ID, {
        owner: { public_key: keypair.publicKey },
      });
      expect(policy2.owner_id).toBeDefined();

      // Update the policy back to ownerless
      const policy3 = await privyClient.policies().update(OWNERLESS_ETHEREUM_POLICY_ID, {
        owner: null,
        authorization_context: { authorizationPrivateKeys: [keypair.privateKey] },
      });
      expect(policy3.owner_id).toBeNull();
    });
  });
});
