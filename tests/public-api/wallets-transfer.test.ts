import { createPublicKey, verify } from 'node:crypto';
import { PrivyClient, PrivyClientOptions } from '../../src/public-api/PrivyClient';
import { formatRequestForAuthorizationSignature } from '../../src/lib/authorization';
import { generateP256KeyPair } from '../../src/lib/cryptography';

const APP_ID = 'test-app-id';
const API_URL = 'http://localhost:4010';
const WALLET_ID = 'wallet-id';
const TRANSFER_URL = `${API_URL}/v1/wallets/${WALLET_ID}/transfer`;

const TRANSFER_BODY = {
  source: { asset: 'usdc', amount: '0.01', chain: 'base' },
  destination: { address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2' },
} as const;

type CapturedRequest = { url: string; headers: Headers; body: any };

function createClient(options: Partial<PrivyClientOptions> = {}) {
  const requests: CapturedRequest[] = [];
  const fetch = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
    requests.push({
      url: String(url),
      headers: new Headers(init?.headers),
      body: JSON.parse(String(init?.body)),
    });
    return new Response(JSON.stringify({ id: 'action-id', status: 'pending' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  });
  const client = new PrivyClient({
    appId: APP_ID,
    appSecret: 'test-secret',
    apiUrl: API_URL,
    fetch,
    ...options,
  });
  return { client, requests };
}

/** Verifies that the wire signature covers exactly the body and Privy headers that were sent. */
function expectValidSignature(request: CapturedRequest, publicKey: string) {
  const idempotencyKey = request.headers.get('privy-idempotency-key');
  const requestExpiry = request.headers.get('privy-request-expiry');
  const payload = formatRequestForAuthorizationSignature({
    version: 1,
    method: 'POST',
    url: request.url,
    body: request.body,
    headers: {
      'privy-app-id': APP_ID,
      ...(idempotencyKey !== null && { 'privy-idempotency-key': idempotencyKey }),
      ...(requestExpiry !== null && { 'privy-request-expiry': requestExpiry }),
    },
  });
  const signature = request.headers.get('privy-authorization-signature');
  expect(signature).toBeTruthy();
  const key = createPublicKey({ key: Buffer.from(publicKey, 'base64'), format: 'der', type: 'spki' });
  expect(verify('sha256', payload, key, Buffer.from(signature!, 'base64'))).toBe(true);
}

describe('PrivyWalletsService.transfer', () => {
  let keyPair: { publicKey: string; privateKey: string };

  beforeAll(async () => {
    keyPair = await generateP256KeyPair();
  });

  it('signs and sends the semantic idempotency key and request expiry', async () => {
    const { client, requests } = createClient();

    await client.wallets().transfer(WALLET_ID, {
      ...TRANSFER_BODY,
      idempotency_key: 'operation-123',
      request_expiry: 1750000010000,
      authorization_context: { authorization_private_keys: [keyPair.privateKey] },
    });

    expect(requests).toHaveLength(1);
    const request = requests[0]!;
    expect(request.url).toBe(TRANSFER_URL);
    expect(request.headers.get('privy-idempotency-key')).toBe('operation-123');
    expect(request.headers.get('privy-request-expiry')).toBe('1750000010000');
    expect(request.body).toEqual(TRANSFER_BODY);
    expectValidSignature(request, keyPair.publicKey);
  });

  it('applies the default expiry and sends no idempotency key when neither is supplied', async () => {
    const { client, requests } = createClient();
    const before = Date.now();

    await client.wallets().transfer(WALLET_ID, {
      ...TRANSFER_BODY,
      authorization_context: { authorization_private_keys: [keyPair.privateKey] },
    });

    const request = requests[0]!;
    expect(request.headers.get('privy-idempotency-key')).toBeNull();
    const expiry = Number(request.headers.get('privy-request-expiry'));
    expect(expiry).toBeGreaterThanOrEqual(before + 15 * 60 * 1000);
    expect(expiry).toBeLessThanOrEqual(Date.now() + 15 * 60 * 1000);
    expect(request.body).toEqual(TRANSFER_BODY);
    expectValidSignature(request, keyPair.publicKey);
  });

  it('sends no expiry when automatic expiry is disabled and none is supplied', async () => {
    const { client, requests } = createClient({ requestExpiry: { disabled: true } });

    await client.wallets().transfer(WALLET_ID, {
      ...TRANSFER_BODY,
      authorization_context: { authorization_private_keys: [keyPair.privateKey] },
    });

    const request = requests[0]!;
    expect(request.headers.get('privy-request-expiry')).toBeNull();
    expectValidSignature(request, keyPair.publicKey);
  });
});
