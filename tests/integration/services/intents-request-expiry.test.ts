import {
  DEFAULT_INTENT_REQUEST_EXPIRY_MS,
  P256KeyPair,
  PrivyClient,
  generateP256KeyPair,
} from '@privy-io/node';
import { TEST_APP } from '../test-config';

const HASH = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
const TOLERANCE_MS = 5 * 60 * 1000;

/** `expires_at` is a Unix timestamp; accept seconds or milliseconds. */
function expiresAtMs(intent: { expires_at: number }): number {
  return intent.expires_at < 1e12 ? intent.expires_at * 1000 : intent.expires_at;
}

function expectDefaultExpiry(intent: { expires_at: number }, before: number, after: number): void {
  const expiresAt = expiresAtMs(intent);
  expect(expiresAt).toBeGreaterThanOrEqual(before + DEFAULT_INTENT_REQUEST_EXPIRY_MS - TOLERANCE_MS);
  expect(expiresAt).toBeLessThanOrEqual(after + DEFAULT_INTENT_REQUEST_EXPIRY_MS + TOLERANCE_MS);
}

function expectCustomExpiry(intent: { expires_at: number; custom_expiry: boolean }, expiry: number): void {
  expect(intent.custom_expiry).toBe(true);
  expect(Math.abs(expiresAtMs(intent) - expiry)).toBeLessThanOrEqual(TOLERANCE_MS);
}

describe('PrivyIntentsService request expiry', () => {
  let privyClient: PrivyClient;
  let walletId: string;

  beforeAll(async () => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
    const keypair = await generateP256KeyPair();
    // rawSign does not support ethereum or solana wallets, so use tron (as in wallets.test.ts).
    const wallet = await privyClient.wallets().create({
      chain_type: 'tron',
      owner: { public_key: keypair.publicKey },
    });
    walletId = wallet.id;
  });

  describe('rawSign', () => {
    it('should default to the 72 hour intent expiry', async () => {
      const before = Date.now();
      const intent = await privyClient.intents().rawSign(walletId, { params: { hash: HASH } });
      const after = Date.now();

      expect(intent.intent_type).toBe('RAW_SIGN');
      expectDefaultExpiry(intent, before, after);
    });

    it('should use a per-call request_expiry', async () => {
      const expiry = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().rawSign(walletId, {
        params: { hash: HASH },
        request_expiry: expiry,
      });

      expectCustomExpiry(intent, expiry);
    });
  });

  // Skipped because the staging wallet is unfunded, so transfer intents fail with insufficient balance.
  describe.skip('transfer', () => {
    const transferInput = {
      source: { asset: 'usdc', amount: '0.01', chain: 'base' },
      destination: { address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2' },
    } as const;

    it('should default to the 72 hour intent expiry', async () => {
      const before = Date.now();
      const intent = await privyClient.intents().transfer(walletId, transferInput);
      const after = Date.now();

      expect(intent.intent_type).toBe('TRANSFER');
      expectDefaultExpiry(intent, before, after);
    });

    it('should use a per-call request_expiry', async () => {
      const expiry = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().transfer(walletId, {
        ...transferInput,
        request_expiry: expiry,
      });

      expectCustomExpiry(intent, expiry);
    });
  });

  describe('deletePolicy', () => {
    let policyId: string;
    let policyKeypair: P256KeyPair;

    beforeAll(async () => {
      policyKeypair = await generateP256KeyPair();
      const policy = await privyClient.policies().create({
        version: '1.0',
        name: 'Intents Request Expiry Test Policy',
        chain_type: 'ethereum',
        owner: { public_key: policyKeypair.publicKey },
        rules: [],
      });
      policyId = policy.id;
    });

    afterAll(async () => {
      await privyClient.policies().delete(policyId, {
        authorization_context: { authorization_private_keys: [policyKeypair.privateKey] },
      });
    });

    it('should default to the 72 hour intent expiry', async () => {
      const before = Date.now();
      const intent = await privyClient.intents().deletePolicy(policyId);
      const after = Date.now();

      expect(intent.intent_type).toBe('POLICY');
      expect(intent.custom_expiry).toBe(true);
      expectDefaultExpiry(intent, before, after);
    });

    it('should use a per-call request_expiry', async () => {
      const expiry = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().deletePolicy(policyId, { request_expiry: expiry });

      expectCustomExpiry(intent, expiry);
    });
  });

  describe('deleteKeyQuorum', () => {
    let keyQuorumId: string;
    let keyQuorumKeypair: P256KeyPair;

    beforeAll(async () => {
      keyQuorumKeypair = await generateP256KeyPair();
      const keyQuorum = await privyClient.keyQuorums().create({
        public_keys: [keyQuorumKeypair.publicKey],
        display_name: 'Intents Request Expiry Test Key Quorum',
        authorization_threshold: 1,
      });
      keyQuorumId = keyQuorum.id;
    });

    afterAll(async () => {
      await privyClient.keyQuorums().delete(keyQuorumId, {
        authorization_context: { authorization_private_keys: [keyQuorumKeypair.privateKey] },
      });
    });

    it('should default to the 72 hour intent expiry', async () => {
      const before = Date.now();
      const intent = await privyClient.intents().deleteKeyQuorum(keyQuorumId);
      const after = Date.now();

      expect(intent.intent_type).toBe('KEY_QUORUM');
      expect(intent.custom_expiry).toBe(true);
      expectDefaultExpiry(intent, before, after);
    });

    it('should use a per-call request_expiry', async () => {
      const expiry = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().deleteKeyQuorum(keyQuorumId, { request_expiry: expiry });

      expectCustomExpiry(intent, expiry);
    });
  });

  // Skipped because these intents need an existing condition set, and PrivyClient does not expose
  // condition set creation. They document the expected call shape and are still type-checked.
  describe.skip('condition sets', () => {
    const conditionSetId = 'condition-set-id';
    const conditionSetItemId = 'condition-set-item-id';

    it('should default to the 72 hour intent expiry when creating condition set items', async () => {
      const before = Date.now();
      const intent = await privyClient.intents().createConditionSetItems(conditionSetId, {
        condition_set_items_request_body: [{ value: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2' }],
      });
      const after = Date.now();

      expectDefaultExpiry(intent, before, after);
    });

    it('should use a per-call request_expiry when updating condition set items', async () => {
      const expiry = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().updateConditionSetItems(conditionSetId, {
        condition_set_items_request_body: [{ value: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2' }],
        request_expiry: expiry,
      });

      expectCustomExpiry(intent, expiry);
    });

    it('should use a per-call request_expiry when deleting a condition set item', async () => {
      const expiry = Date.now() + 60 * 60 * 1000;
      const intent = await privyClient.intents().deleteConditionSetItem(conditionSetItemId, {
        condition_set_id: conditionSetId,
        request_expiry: expiry,
      });

      expectCustomExpiry(intent, expiry);
    });

    it('should default to the 72 hour intent expiry when deleting a condition set', async () => {
      const before = Date.now();
      const intent = await privyClient.intents().deleteConditionSet(conditionSetId);
      const after = Date.now();

      expectDefaultExpiry(intent, before, after);
    });
  });
});
