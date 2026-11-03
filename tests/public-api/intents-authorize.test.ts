import canonicalize from 'canonicalize';
import { createPublicKey, verify } from 'node:crypto';
import { PrivyClient } from '../../src/public-api/PrivyClient';
import { generateP256KeyPair } from '../../src/lib/cryptography';

const APP_ID = 'test-app-id';
const API_URL = 'http://localhost:4010';
const INTENT_ID = 'intent-id';
const EXPIRES_AT = 1750000010000;

const RPC_REQUEST_DETAILS = {
  method: 'POST',
  url: 'https://api.privy.io/v1/wallets/wallet-id/rpc',
  body: { method: 'personal_sign', params: { message: 'hello', encoding: 'utf-8' } },
};

const DELETE_REQUEST_DETAILS = {
  method: 'DELETE',
  url: 'https://api.privy.io/v1/policies/policy-id',
  body: {},
};

type CapturedRequest = { method: string; url: string; body: any };

function createClient(intent: Record<string, unknown>) {
  const requests: CapturedRequest[] = [];
  const fetch = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
    requests.push({
      method: init?.method ?? 'GET',
      url: String(url),
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    });
    return new Response(JSON.stringify(intent), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  });
  const client = new PrivyClient({ appId: APP_ID, appSecret: 'test-secret', apiUrl: API_URL, fetch });
  return { client, requests };
}

function buildIntent(requestDetails: object, customExpiry: boolean) {
  return {
    intent_id: INTENT_ID,
    intent_type: 'RPC',
    status: 'pending',
    custom_expiry: customExpiry,
    expires_at: EXPIRES_AT,
    request_details: requestDetails,
  };
}

/** Verifies the signature against the payload Privy rebuilds from the stored intent. */
function expectValidSignature({
  request,
  requestDetails,
  requestExpiry,
  publicKey,
}: {
  request: CapturedRequest;
  requestDetails: { method: string; url: string; body: unknown };
  requestExpiry: string | undefined;
  publicKey: string;
}) {
  const payload = canonicalize({
    version: 1,
    method: requestDetails.method,
    url: requestDetails.url,
    body: requestDetails.body,
    timestamp: request.body.timestamp,
    intent_id: INTENT_ID,
    headers: {
      'privy-app-id': APP_ID,
      ...(requestExpiry !== undefined && { 'privy-request-expiry': requestExpiry }),
    },
  })!;
  const key = createPublicKey({ key: Buffer.from(publicKey, 'base64'), format: 'der', type: 'spki' });
  expect(verify('sha256', Buffer.from(payload), key, Buffer.from(request.body.signature, 'base64'))).toBe(
    true,
  );
}

describe('PrivyIntentsService.authorize', () => {
  let keyPair: { publicKey: string; privateKey: string };

  beforeAll(async () => {
    keyPair = await generateP256KeyPair();
  });

  it('fetches the intent, then submits a signature over its action and expiry', async () => {
    const { client, requests } = createClient(buildIntent(RPC_REQUEST_DETAILS, true));
    const before = Date.now();

    await client.intents().authorize(INTENT_ID, {
      authorization_context: { authorization_private_keys: [keyPair.privateKey] },
    });

    expect(requests.map(({ method, url }) => [method, url])).toEqual([
      ['GET', `${API_URL}/v1/intents/${INTENT_ID}`],
      ['POST', `${API_URL}/v1/intents/${INTENT_ID}/authorize`],
    ]);
    const request = requests[1]!;
    expect(Object.keys(request.body).sort()).toEqual(['signature', 'timestamp']);
    expect(request.body.timestamp).toBeGreaterThanOrEqual(before);
    expect(request.body.timestamp).toBeLessThanOrEqual(Date.now());
    expectValidSignature({
      request,
      requestDetails: RPC_REQUEST_DETAILS,
      requestExpiry: String(EXPIRES_AT),
      publicKey: keyPair.publicKey,
    });
  });

  it('omits the expiry from the payload when the intent has no custom expiry', async () => {
    const { client, requests } = createClient(buildIntent(RPC_REQUEST_DETAILS, false));

    await client.intents().authorize(INTENT_ID, {
      authorization_context: { authorization_private_keys: [keyPair.privateKey] },
    });

    expectValidSignature({
      request: requests[1]!,
      requestDetails: RPC_REQUEST_DETAILS,
      requestExpiry: undefined,
      publicKey: keyPair.publicKey,
    });
  });

  it('signs an empty body as an empty object', async () => {
    const { client, requests } = createClient(buildIntent(DELETE_REQUEST_DETAILS, true));

    await client.intents().authorize(INTENT_ID, {
      authorization_context: { authorization_private_keys: [keyPair.privateKey] },
    });

    expectValidSignature({
      request: requests[1]!,
      requestDetails: DELETE_REQUEST_DETAILS,
      requestExpiry: String(EXPIRES_AT),
      publicKey: keyPair.publicKey,
    });
  });

  it('rejects an authorization context that produces more than one signature before fetching the intent', async () => {
    const otherKeyPair = await generateP256KeyPair();
    const { client, requests } = createClient(buildIntent(RPC_REQUEST_DETAILS, true));

    await expect(
      client.intents().authorize(INTENT_ID, {
        authorization_context: {
          authorization_private_keys: [keyPair.privateKey, otherKeyPair.privateKey],
        },
      }),
    ).rejects.toThrow('single authorization signature');
    expect(requests).toEqual([]);
  });

  it('rejects an empty authorization context before fetching the intent', async () => {
    const { client, requests } = createClient(buildIntent(RPC_REQUEST_DETAILS, true));

    await expect(client.intents().authorize(INTENT_ID, { authorization_context: {} })).rejects.toThrow(
      'single authorization signature',
    );
    expect(requests).toEqual([]);
  });
});
