import { PrivyClient, generateP256KeyPair, P256KeyPair } from '@privy-io/node';
import { TEST_APP } from '../test-config';

describe('PrivyIntentsService', () => {
  let privyClient: PrivyClient;

  beforeAll(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });

  describe('RPC intents', () => {
    let walletId: string;
    let keypair: P256KeyPair;

    beforeAll(async () => {
      keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: keypair.publicKey },
      });
      walletId = wallet.id;
    });

    it('should create an RPC intent for a wallet with an owner', async () => {
      const intent = await privyClient.intents().rpc(walletId, {
        method: 'personal_sign',
        params: { message: 'Hello from intents test', encoding: 'utf-8' },
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('RPC');
      expect(intent.status).toBe('pending');
      expect(intent.resource_id).toBe(walletId);
      expect(intent.authorization_details).toBeDefined();
      expect(intent.expires_at).toBeGreaterThan(Date.now() / 1000);
      expect(intent.request_details).toMatchObject({
        method: 'POST',
      });
    });

    it('should create an RPC intent with a custom expiry', async () => {
      const expiryMs = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().rpc(walletId, {
        method: 'personal_sign',
        params: { message: 'Expiry test', encoding: 'utf-8' },
        request_expiry: expiryMs,
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.status).toBe('pending');
      expect(intent.custom_expiry).toBe(true);
    });

    it('should get an intent by ID', async () => {
      const created = await privyClient.intents().rpc(walletId, {
        method: 'personal_sign',
        params: { message: 'Get test', encoding: 'utf-8' },
      });

      const fetched = await privyClient.intents().get(created.intent_id);
      expect(fetched.intent_id).toBe(created.intent_id);
      expect(fetched.intent_type).toBe('RPC');
      expect(fetched.status).toBe('pending');
      expect(fetched.resource_id).toBe(walletId);
    });

    it('should list intents and include a created intent', async () => {
      const created = await privyClient.intents().rpc(walletId, {
        method: 'personal_sign',
        params: { message: 'List test', encoding: 'utf-8' },
      });

      let found = false;
      for await (const intent of privyClient.intents().list({
        resource_id: walletId,
        intent_type: 'RPC',
      })) {
        if (intent.intent_id === created.intent_id) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    it('should list intents filtered by status', async () => {
      await privyClient.intents().rpc(walletId, {
        method: 'personal_sign',
        params: { message: 'Status filter test', encoding: 'utf-8' },
      });

      const pendingIntents: string[] = [];
      for await (const intent of privyClient.intents().list({
        resource_id: walletId,
        status: 'pending',
      })) {
        pendingIntents.push(intent.intent_id);
      }
      expect(pendingIntents.length).toBeGreaterThan(0);
    });
  });

  describe('wallet update intents', () => {
    let walletId: string;
    let keypair: P256KeyPair;

    beforeAll(async () => {
      keypair = await generateP256KeyPair();
      const wallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner: { public_key: keypair.publicKey },
      });
      walletId = wallet.id;
    });

    it('should create an intent to update a wallet display name', async () => {
      const intent = await privyClient.intents().updateWallet(walletId, {
        display_name: 'My Updated Wallet',
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('WALLET');
      expect(intent.status).toBe('pending');
      expect(intent.resource_id).toBe(walletId);
      expect(intent.request_details).toMatchObject({
        method: 'PATCH',
      });
    });
  });

  describe('policy intents', () => {
    let policyId: string;
    let ruleId: string;
    let keypair: P256KeyPair;

    beforeAll(async () => {
      keypair = await generateP256KeyPair();
      const policy = await privyClient.policies().create({
        version: '1.0',
        name: 'Intents Test Policy',
        chain_type: 'ethereum',
        owner: { public_key: keypair.publicKey },
        rules: [
          {
            name: 'Allow small transfers',
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
      policyId = policy.id;
      ruleId = policy.rules[0]!.id;
    });

    afterAll(async () => {
      await privyClient.policies().delete(policyId, {
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });
    });

    it('should create an intent to update a policy', async () => {
      const intent = await privyClient.intents().updatePolicy(policyId, {
        name: 'Renamed Policy',
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('POLICY');
      expect(intent.status).toBe('pending');
      expect(intent.resource_id).toBe(policyId);
      expect(intent.request_details).toMatchObject({
        method: 'PATCH',
      });
    });

    it('should create an intent to add a rule to a policy', async () => {
      const intent = await privyClient.intents().createPolicyRule(policyId, {
        name: 'Restrict destination address',
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

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('RULE');
      expect(intent.status).toBe('pending');
      expect(intent.request_details).toMatchObject({
        method: 'POST',
      });
    });

    it('should create an intent to update a rule on a policy', async () => {
      const intent = await privyClient.intents().updatePolicyRule(ruleId, {
        policy_id: policyId,
        name: 'Updated rule name',
        method: 'eth_sendTransaction',
        action: 'DENY',
        conditions: [
          {
            field: 'value',
            field_source: 'ethereum_transaction',
            operator: 'lte',
            value: '0x2386F26FC10000',
          },
        ],
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('RULE');
      expect(intent.status).toBe('pending');
      expect(intent.request_details).toMatchObject({
        method: 'PATCH',
      });
    });

    it('should create an intent to delete a rule from a policy', async () => {
      const intent = await privyClient.intents().deletePolicyRule(ruleId, {
        policy_id: policyId,
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('RULE');
      expect(intent.status).toBe('pending');
      expect(intent.request_details).toMatchObject({
        method: 'DELETE',
      });
    });
  });

  describe('key quorum intents', () => {
    let keyQuorumId: string;
    let keypair1: P256KeyPair;
    let keypair2: P256KeyPair;

    beforeAll(async () => {
      keypair1 = await generateP256KeyPair();
      keypair2 = await generateP256KeyPair();
      const keyQuorum = await privyClient.keyQuorums().create({
        public_keys: [keypair1.publicKey, keypair2.publicKey],
        display_name: 'Intents Test Key Quorum',
        authorization_threshold: 2,
      });
      keyQuorumId = keyQuorum.id;
    });

    afterAll(async () => {
      await privyClient.keyQuorums().delete(keyQuorumId, {
        authorization_context: {
          authorization_private_keys: [keypair1.privateKey, keypair2.privateKey],
        },
      });
    });

    it('should create an intent to update a key quorum', async () => {
      const intent = await privyClient.intents().updateKeyQuorum(keyQuorumId, {
        authorization_threshold: 1,
      });

      expect(intent.intent_id).toBeDefined();
      expect(intent.intent_type).toBe('KEY_QUORUM');
      expect(intent.status).toBe('pending');
      expect(intent.resource_id).toBe(keyQuorumId);
      expect(intent.request_details).toMatchObject({
        method: 'PATCH',
      });
    });
  });
});
