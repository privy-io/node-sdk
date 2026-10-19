import { PrivyClient } from '@privy-io/node';
import { cleanupTestWalletResources, setupTestWalletResources, TestWalletResources } from '../test-setup';

// These tests are skipped because attaching an automation needs an existing automation, and
// PrivyClient does not expose automation creation. They document the expected call shape and are
// still type-checked.
describe('PrivyWalletsService automations', () => {
  let resources: TestWalletResources;
  let privyClient: PrivyClient;
  let walletId: string;
  let keyOwnedWalletId: string;
  const automationId = 'automation-id';

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    privyClient = resources.client;

    const wallet = await privyClient.wallets().create({ chain_type: 'ethereum' });
    walletId = wallet.id;

    const keyOwnedWallet = await privyClient.wallets().create({
      chain_type: 'ethereum',
      owner: { public_key: resources.p256KeyPair.publicKey },
    });
    keyOwnedWalletId = keyOwnedWallet.id;
  });

  afterAll(async () => {
    if (resources !== undefined) await cleanupTestWalletResources(resources);
  });

  describe('attachAutomations', () => {
    it.skip('attaches an automation to an ownerless wallet', async () => {
      const response = await privyClient.wallets().attachAutomations(walletId, {
        automation_ids: [automationId],
      });

      expect(response.data).toHaveLength(1);
      expect(response.data[0]?.automation_id).toBe(automationId);
    });

    it.skip('attaches an automation to a key-owned wallet with an authorization context', async () => {
      const response = await privyClient.wallets().attachAutomations(keyOwnedWalletId, {
        automation_ids: [automationId],
        authorization_context: { authorization_private_keys: [resources.p256KeyPair.privateKey] },
        request_expiry: Date.now() + 60_000,
      });

      expect(response.data).toHaveLength(1);
    });
  });

  describe('detachAutomations', () => {
    it.skip('detaches an automation from an ownerless wallet', async () => {
      const response = await privyClient.wallets().detachAutomations(walletId, {
        automation_ids: [automationId],
      });

      expect(response.success).toBe(true);
    });

    it.skip('detaches an automation from a key-owned wallet with an authorization context', async () => {
      const response = await privyClient.wallets().detachAutomations(keyOwnedWalletId, {
        automation_ids: [automationId],
        authorization_context: { authorization_private_keys: [resources.p256KeyPair.privateKey] },
      });

      expect(response.success).toBe(true);
    });
  });
});
