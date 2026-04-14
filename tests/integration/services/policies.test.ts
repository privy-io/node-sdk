import { P256KeyPair, PrivyClient, generateP256KeyPair } from '@privy-io/node';
import { NotFoundError } from '@privy-io/node';
import crypto from 'node:crypto';
import { erc20Abi, getAbiItem, getAddress } from 'viem';
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
  describe('create', () => {
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

      await privyClient.policies().delete(policy.id, {});
    });
  });
  describe('create with viem abi schema', () => {
    it('should create a policy with a condition using an abi from viem', async () => {
      const tokens = ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'];
      const spenders = ['0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'];
      const policy = await privyClient.policies().create({
        version: '1.0',
        name: 'ERC20 Approve allowlist',
        chain_type: 'ethereum',
        rules: [
          {
            name: 'ERC20 Approve to allowed spenders',
            method: 'eth_sendTransaction',
            action: 'ALLOW',
            conditions: [
              {
                field_source: 'ethereum_transaction',
                field: 'to',
                operator: 'in',
                value: tokens.map((token) => getAddress(token)),
              },
              {
                field_source: 'ethereum_calldata',
                field: 'approve.spender',
                operator: 'in',
                value: spenders.map((spender) => getAddress(spender)),
                abi: [getAbiItem({ abi: erc20Abi, name: 'approve' })],
              },
            ],
          },
        ],
      });

      expect(policy.id).toBeDefined();
      expect(policy.name).toBe('ERC20 Approve allowlist');
      expect(policy.chain_type).toBe('ethereum');
      expect(policy.rules).toEqual([
        expect.objectContaining({
          name: 'ERC20 Approve to allowed spenders',
          method: 'eth_sendTransaction',
          action: 'ALLOW',
        }),
      ]);

      await privyClient.policies().delete(policy.id, {});
    });
  });
  describe('create idempotency', () => {
    it('will succeed if the idempotency key is reused with the same body', async () => {
      const idempotencyKey = crypto.randomUUID();
      const response1 = await privyClient.policies().create({
        version: '1.0',
        name: 'NodeSDK Idempotency Test',
        chain_type: 'ethereum',
        rules: [],
        idempotency_key: idempotencyKey,
      });
      expect(response1.id).toBeDefined();
      expect(response1.name).toBe('NodeSDK Idempotency Test');
      expect(response1.chain_type).toBe('ethereum');

      const response2 = await privyClient.policies().create({
        version: '1.0',
        name: 'NodeSDK Idempotency Test',
        chain_type: 'ethereum',
        rules: [],
        idempotency_key: idempotencyKey,
      });
      expect(response2.id).toBe(response1.id);

      await privyClient.policies().delete(response1.id, {});
    });
    it('will fail if the idempotency key is reused with a different body', async () => {
      const idempotencyKey = crypto.randomUUID();
      const response = await privyClient.policies().create({
        version: '1.0',
        name: 'NodeSDK Idempotency Test',
        chain_type: 'ethereum',
        rules: [],
        idempotency_key: idempotencyKey,
      });

      await expect(
        privyClient.policies().create({
          version: '1.0',
          name: 'NodeSDK Idempotency Test Different',
          chain_type: 'ethereum',
          rules: [],
          idempotency_key: idempotencyKey,
        }),
      ).rejects.toThrow(
        `400 {"error":"Idempotency key was reused for a request with a new body. Please create a new idempotency key for the request.","code":"invalid_data"}`,
      );

      await privyClient.policies().delete(response.id, {});
    });
  });
  describe('update', () => {
    it('should be able to change the owner on a policy', async () => {
      const keypair = await generateP256KeyPair();

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
      const keypair = await generateP256KeyPair();
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
    let keypair: P256KeyPair;
    beforeEach(async () => {
      keypair = await generateP256KeyPair();
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
