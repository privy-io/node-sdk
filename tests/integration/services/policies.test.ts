import { PrivyClient } from '@privy-io/node';
import { generateP256KeyPair } from '../../helpers/authorization-keys';
import { NotFoundError } from '@privy-io/node';

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
  describe('delete', () => {
    it('should delete a policy', async () => {
      const keypair = generateP256KeyPair();
      const createdPolicy = await privyClient.policies().create({
        version: '1.0',
        chain_type: 'ethereum',
        name: 'NodeSDK Policies Delete Test',
        rules: [],
        owner: { public_key: keypair.publicKey },
      });
      expect(createdPolicy.id).toBeDefined();

      // Check that the policy exists
      expect(await privyClient.policies().get(createdPolicy.id)).toMatchObject({
        id: createdPolicy.id,
      });

      const deletedPolicy = await privyClient.policies().delete(createdPolicy.id, {
        authorization_context: { authorizationPrivateKeys: [keypair.privateKey] },
      });
      expect(deletedPolicy.success).toBe(true);

      // Check that the policy no longer exists
      await expect(() => privyClient.policies().get(createdPolicy.id)).rejects.toThrow(NotFoundError);
    });
  });
  describe('rules', () => {
    let policyId: string;
    let ruleId: string;
    let keypair: ReturnType<typeof generateP256KeyPair>;
    beforeEach(async () => {
      keypair = generateP256KeyPair();
      const policy = await privyClient.policies().create({
        version: '1.0',
        name: 'NodeSDK Policies Rules Test',
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
        owner: { public_key: keypair.publicKey },
      });
      policyId = policy.id;
      ruleId = policy.rules[0]!.id;
    });
    afterEach(async () => {
      await privyClient.policies().delete(policyId, {
        authorization_context: { authorizationPrivateKeys: [keypair.privateKey] },
      });
    });
    it('should be able to get a rule', async () => {
      const response = await privyClient.policies().getRule(ruleId, {
        policy_id: policyId,
      });

      expect(response).toMatchObject({
        id: ruleId,
        name: 'Restrict ETH transfers to a maximum value',
        method: 'eth_sendTransaction',
        action: 'ALLOW',
        conditions: [
          {
            field: 'value',
            field_source: 'ethereum_transaction',
            operator: 'lte',
            value: '0x2386F26FC10000',
          },
        ],
      });
    });
    it('should be able to delete a rule', async () => {
      const response = await privyClient.policies().deleteRule(ruleId, {
        authorization_context: { authorizationPrivateKeys: [keypair.privateKey] },
        policy_id: policyId,
      });
      expect(response.success).toBe(true);

      const policy = await privyClient.policies().get(policyId);
      expect(policy.rules).toEqual([]);
    });
    it('should be able to create a rule', async () => {
      const response = await privyClient.policies().createRule(policyId, {
        authorization_context: { authorizationPrivateKeys: [keypair.privateKey] },
        name: 'name',
        method: 'eth_sendTransaction',
        action: 'ALLOW',
        conditions: [
          {
            field: 'to',
            field_source: 'ethereum_transaction',
            operator: 'eq',
            value: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          },
        ],
      });
      expect(response.id).toBeDefined();

      const policy = await privyClient.policies().get(policyId);
      expect(policy.rules).toEqual([
        expect.objectContaining({
          id: ruleId,
          name: 'Restrict ETH transfers to a maximum value',
        }),
        expect.objectContaining({
          id: response.id,
          name: 'name',
        }),
      ]);
    });
    it('should be able to update a rule', async () => {
      const response = await privyClient.policies().updateRule(ruleId, {
        authorization_context: { authorizationPrivateKeys: [keypair.privateKey] },
        policy_id: policyId,
        name: 'name',
        method: 'eth_sendTransaction',
        action: 'DENY',
        conditions: [
          {
            field: 'to',
            field_source: 'ethereum_transaction',
            operator: 'eq',
            value: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          },
        ],
      });

      expect(response.id).toBe(ruleId);

      const policy = await privyClient.policies().get(policyId);
      expect(policy.rules).toEqual([
        expect.objectContaining({
          id: ruleId,
          name: 'name',
          action: 'DENY',
        }),
      ]);
    });
  });
});
