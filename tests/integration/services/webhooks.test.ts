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

  describe('verify', () => {
    afterEach(() => jest.useRealTimers());

    it('should verify a webhook and return typed payload', () => {
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

      const signingSecret = crypto.randomBytes(32).toString('base64');
      const payload = JSON.stringify(userCreatedPayload);
      const msgId = `msg_${crypto.randomUUID()}`;
      const timestamp = Math.floor(Date.now() / 1000);

      const wh = new Webhook(signingSecret);
      const signature = wh.sign(msgId, new Date(timestamp * 1000), payload);

      jest.useFakeTimers({ now: timestamp * 1000 + 60_000 });

      const result = privyClient.webhooks().verify({
        payload,
        headers: {
          'svix-id': msgId,
          'svix-timestamp': timestamp.toString(),
          'svix-signature': signature,
        },
        signingSecret,
      });

      expect(result).toEqual(userCreatedPayload);
    });

    it('should accept object payload for backwards compat', () => {
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

      const signingSecret = crypto.randomBytes(32).toString('base64');
      // Sign the stringified version (which is what the server sends)
      const stringPayload = JSON.stringify(userCreatedPayload);
      const msgId = `msg_${crypto.randomUUID()}`;
      const timestamp = Math.floor(Date.now() / 1000);

      const wh = new Webhook(signingSecret);
      const signature = wh.sign(msgId, new Date(timestamp * 1000), stringPayload);

      jest.useFakeTimers({ now: timestamp * 1000 + 60_000 });

      // Pass the object (not string) — backwards compat path
      const result = privyClient.webhooks().verify({
        payload: userCreatedPayload,
        headers: {
          'svix-id': msgId,
          'svix-timestamp': timestamp.toString(),
          'svix-signature': signature,
        },
        signingSecret,
      });

      expect(result).toEqual(userCreatedPayload);
    });

    it('should use client-level signing secret', () => {
      const signingSecret = crypto.randomBytes(32).toString('base64');

      const client = new PrivyClient({
        appId: TEST_APP.id,
        appSecret: TEST_APP.secret,
        apiUrl: TEST_APP.apiUrl,
        webhookSigningSecret: signingSecret,
      });

      const userCreatedPayload = { type: 'user.created', user: { id: 'did:privy:test' } };
      const payload = JSON.stringify(userCreatedPayload);
      const msgId = `msg_${crypto.randomUUID()}`;
      const timestamp = Math.floor(Date.now() / 1000);

      const wh = new Webhook(signingSecret);
      const signature = wh.sign(msgId, new Date(timestamp * 1000), payload);

      jest.useFakeTimers({ now: timestamp * 1000 + 60_000 });

      const result = client.webhooks().verify({
        payload,
        headers: {
          'svix-id': msgId,
          'svix-timestamp': timestamp.toString(),
          'svix-signature': signature,
        },
      });

      expect(result).toHaveProperty('type', 'user.created');
    });

    it('should throw InvalidWebhookError on bad signature', () => {
      const signingSecret = crypto.randomBytes(32).toString('base64');

      jest.useFakeTimers({ now: Date.now() });

      expect(() =>
        privyClient.webhooks().verify({
          payload: '{"type":"user.created"}',
          headers: {
            'svix-id': 'msg_fake',
            'svix-timestamp': Math.floor(Date.now() / 1000).toString(),
            'svix-signature': 'v1,invalidSignature==',
          },
          signingSecret,
        }),
      ).toThrow('Webhook verification failed');
    });

    it('should throw when no signing secret is provided', () => {
      expect(() =>
        privyClient.webhooks().verify({
          payload: '{"type":"user.created"}',
          headers: {
            'svix-id': 'msg_fake',
            'svix-timestamp': '12345',
            'svix-signature': 'v1,sig==',
          },
        }),
      ).toThrow('Webhook signing secret is required');
    });
  });
});
