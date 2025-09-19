import { PrivyClient } from '@privy-io/node';
import { generateP256KeyPair } from '../../helpers/authorization-keys';
import { NotFoundError } from '@privy-io/node';
import { TEST_APP } from '../test-config';

describe('PrivyPoliciesService', () => {
  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
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

      // Start with an ownerless policy
      const policy = await privyClient.policies().create({
        version: '1.0',
        chain_type: 'ethereum',
        name: 'NodeSDK Policies Update Test',
        rules: [],
      });
      expect(policy.id).toBeDefined();
      expect(policy.owner_id).toBeNull();
      const policyId = policy.id;

      // Update the owner field to a p256 key
      const policy2 = await privyClient.policies().update(policyId, {
        owner: { public_key: keypair.publicKey },
      });
      expect(policy2.owner_id).toBeDefined();

      // Update the policy back to ownerless
      const policy3 = await privyClient.policies().update(policyId, {
        owner: null,
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
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
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
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
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
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
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
        policy_id: policyId,
      });
      expect(response.success).toBe(true);

      const policy = await privyClient.policies().get(policyId);
      expect(policy.rules).toEqual([]);
    });
    it('should be able to create a rule', async () => {
      const response = await privyClient.policies().createRule(policyId, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
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
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
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
