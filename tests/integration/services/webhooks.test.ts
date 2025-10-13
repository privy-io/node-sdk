import { PrivyClient } from '@privy-io/node';
import { TEST_APP } from '../test-config';
import crypto from 'node:crypto';
import { Webhook } from 'svix';

describe('PrivyWebhooksService', () => {
  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });
  describe('verifyWebhook', () => {
    afterEach(() => jest.useRealTimers());
    it('should verify a webhook signature', async () => {
      const userCreatedPayload = {
        type: 'user.created',
        user: {
          created_at: 969628260,
          has_accepted_terms: false,
          id: 'did:privy:cfbsvtqo2c22202mo08847jdux2z',
          is_guest: false,
          linked_accounts: [
            {
              address: 'bilbo@privy.io',
              first_verified_at: 969628260,
              latest_verified_at: 969628260,
              type: 'email',
              verified_at: 969628260,
            },
          ],
          mfa_methods: [],
        },
      };

      const signingSecret = crypto.randomBytes(32).toString('hex');

      const webhook = new Webhook(signingSecret);
      const stringPayload = JSON.stringify(userCreatedPayload);
      const payloadId = crypto.randomUUID();
      const timestamp = 1715894510; // Some time in epoch seconds
      const signature = webhook.sign(payloadId, new Date(timestamp * 1000), stringPayload);

      jest.useFakeTimers({ now: timestamp * 1000 + 1000 * 60 * 1 }); // 1 minute after the timestamp

      const verifiedPayload = await privyClient.webhooks().verify({
        payload: userCreatedPayload,
        svix: {
          id: payloadId,
          timestamp: timestamp.toString(),
          signature: signature,
        },
        signing_secret: signingSecret,
      });

      expect(verifiedPayload).toEqual(userCreatedPayload);
    });
    it('should fall back to a client-level set signing secret', async () => {
      const signingSecret = crypto.randomBytes(32).toString('hex');

      const privyClient = new PrivyClient({
        appId: TEST_APP.id,
        appSecret: TEST_APP.secret,
        apiUrl: TEST_APP.apiUrl,
        webhookSigningSecret: signingSecret,
      });

      const userCreatedPayload = {
        type: 'user.created',
        user: {
          created_at: 969628260,
          has_accepted_terms: false,
          id: 'did:privy:cfbsvtqo2c22202mo08847jdux2z',
          is_guest: false,
          linked_accounts: [
            {
              address: 'bilbo@privy.io',
              first_verified_at: 969628260,
              latest_verified_at: 969628260,
              type: 'email',
              verified_at: 969628260,
            },
          ],
          mfa_methods: [],
        },
      };

      const webhook = new Webhook(signingSecret);
      const stringPayload = JSON.stringify(userCreatedPayload);
      const payloadId = crypto.randomUUID();
      const timestamp = 1715894510; // Some time in epoch seconds
      const signature = webhook.sign(payloadId, new Date(timestamp * 1000), stringPayload);

      jest.useFakeTimers({ now: timestamp * 1000 + 1000 * 60 * 1 }); // 1 minute after the timestamp

      const verifiedPayload = await privyClient.webhooks().verify({
        payload: userCreatedPayload,
        svix: {
          id: payloadId,
          timestamp: timestamp.toString(),
          signature: signature,
        },
      });

      expect(verifiedPayload).toEqual(userCreatedPayload);
    });
  });
});
