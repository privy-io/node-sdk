import { PrivyClient, generateP256KeyPair, P256KeyPair } from '@privy-io/node';
import { TEST_APP } from '../test-config';

const HASH = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
// Rejections must come from the request expiry check, not from another validation error.
const EXPIRY_ERROR = /expir/i;

describe('request expiry on signed wrappers', () => {
  let privyClient: PrivyClient;
  let keypair: P256KeyPair;
  let walletId: string;

  beforeAll(async () => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
    keypair = await generateP256KeyPair();
    // rawSign does not support ethereum or solana wallets, so use tron (as in wallets.test.ts).
    const wallet = await privyClient.wallets().create({
      chain_type: 'tron',
      owner: { public_key: keypair.publicKey },
    });
    walletId = wallet.id;
  });

  describe('rawSign', () => {
    it('should accept the default request expiry', async () => {
      const response = await privyClient.wallets().rawSign(walletId, {
        params: { hash: HASH },
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });

      expect(response.signature).toMatch(/^0x[0-9a-f]+$/);
    });

    it('should accept a per-call request_expiry', async () => {
      const response = await privyClient.wallets().rawSign(walletId, {
        params: { hash: HASH },
        request_expiry: Date.now() + 20 * 60 * 1000,
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });

      expect(response.signature).toMatch(/^0x[0-9a-f]+$/);
    });

    it('should reject an expired per-call request_expiry', async () => {
      await expect(
        privyClient.wallets().rawSign(walletId, {
          params: { hash: HASH },
          request_expiry: Date.now() - 60 * 1000,
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        }),
      ).rejects.toThrow(EXPIRY_ERROR);
    });

    it('should reject a per-call request_expiry of 0', async () => {
      await expect(
        privyClient.wallets().rawSign(walletId, {
          params: { hash: HASH },
          request_expiry: 0,
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        }),
      ).rejects.toThrow(EXPIRY_ERROR);
    });
  });

  describe('update', () => {
    it('should accept the default request expiry', async () => {
      const wallet = await privyClient.wallets().update(walletId, {
        display_name: 'Request expiry default',
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });

      expect(wallet.id).toBe(walletId);
    });

    it('should accept a per-call request_expiry', async () => {
      const wallet = await privyClient.wallets().update(walletId, {
        display_name: 'Request expiry per-call',
        request_expiry: Date.now() + 20 * 60 * 1000,
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });

      expect(wallet.id).toBe(walletId);
    });

    it('should reject an expired per-call request_expiry', async () => {
      await expect(
        privyClient.wallets().update(walletId, {
          display_name: 'Request expiry expired',
          request_expiry: Date.now() - 60 * 1000,
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        }),
      ).rejects.toThrow(EXPIRY_ERROR);
    });
  });

  describe('with request expiry disabled', () => {
    let disabledClient: PrivyClient;

    beforeAll(() => {
      disabledClient = new PrivyClient({
        appId: TEST_APP.id,
        appSecret: TEST_APP.secret,
        apiUrl: TEST_APP.apiUrl,
        requestExpiry: { disabled: true },
      });
    });

    it('should accept a request without an expiry', async () => {
      const response = await disabledClient.wallets().rawSign(walletId, {
        params: { hash: HASH },
        authorization_context: { authorization_private_keys: [keypair.privateKey] },
      });

      expect(response.signature).toMatch(/^0x[0-9a-f]+$/);
    });

    // Without a client default, the request only fails if the per-call `0` is sent as the header.
    it('should still send a per-call request_expiry of 0', async () => {
      await expect(
        disabledClient.wallets().rawSign(walletId, {
          params: { hash: HASH },
          request_expiry: 0,
          authorization_context: { authorization_private_keys: [keypair.privateKey] },
        }),
      ).rejects.toThrow(EXPIRY_ERROR);
    });
  });
});
