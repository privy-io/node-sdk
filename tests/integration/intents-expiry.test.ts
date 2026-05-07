import { PrivyClient } from '@privy-io/node';

const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000;

function makeClient(overrides: {
  disableRequestExpiry?: boolean;
  defaultRequestExpiryMs?: number;
  defaultIntentRequestExpiryMs?: number;
}): {
  client: PrivyClient;
  captured: { request: Request | null };
} {
  const captured: { request: Request | null } = { request: null };
  const fetchSpy: typeof fetch = async (input, init) => {
    const req = input instanceof Request ? input : new Request(input, init);
    captured.request = req;
    return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
  };

  const client = new PrivyClient({
    appId: 'test-app-id',
    appSecret: 'test-app-secret',
    fetch: fetchSpy,
    ...overrides,
  });

  return { client, captured };
}

function expiryHeaderMs(req: Request | null): number {
  const value = req?.headers.get('privy-request-expiry');
  expect(value).toMatch(/^\d+$/);
  return Number(value);
}

describe('intents request expiry', () => {
  it('defaults to 72 hours from now when no per-call or client option is set', async () => {
    const { client, captured } = makeClient({});
    const before = Date.now();

    await client.intents().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    const after = Date.now();
    const expiry = expiryHeaderMs(captured.request);
    expect(expiry).toBeGreaterThanOrEqual(before + SEVENTY_TWO_HOURS_MS);
    expect(expiry).toBeLessThanOrEqual(after + SEVENTY_TWO_HOURS_MS);
  });

  it('uses defaultIntentRequestExpiryMs when set', async () => {
    const tenMinutes = 10 * 60 * 1000;
    const { client, captured } = makeClient({ defaultIntentRequestExpiryMs: tenMinutes });
    const before = Date.now();

    await client.intents().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    const after = Date.now();
    const expiry = expiryHeaderMs(captured.request);
    expect(expiry).toBeGreaterThanOrEqual(before + tenMinutes);
    expect(expiry).toBeLessThanOrEqual(after + tenMinutes);
  });

  it('uses per-call request_expiry verbatim when provided (timestamp semantics)', async () => {
    const perCallTimestamp = Date.now() + 5 * 60 * 1000;
    const { client, captured } = makeClient({
      defaultIntentRequestExpiryMs: 60 * 60 * 1000, // should be ignored
    });

    await client.intents().rpc('wallet-id', {
      request_expiry: perCallTimestamp,
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    const expiry = expiryHeaderMs(captured.request);
    expect(expiry).toBe(perCallTimestamp);
  });

  it('omits the header when disableRequestExpiry is true', async () => {
    const { client, captured } = makeClient({ disableRequestExpiry: true });

    await client.intents().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    expect(captured.request?.headers.get('privy-request-expiry')).toBeNull();
  });

  it('does not mix with defaultRequestExpiryMs', async () => {
    const { client, captured } = makeClient({ defaultRequestExpiryMs: 15 * 60 * 1000 });
    const before = Date.now();

    await client.intents().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    const after = Date.now();
    const expiry = expiryHeaderMs(captured.request);
    expect(expiry).toBeGreaterThanOrEqual(before + SEVENTY_TWO_HOURS_MS);
    expect(expiry).toBeLessThanOrEqual(after + SEVENTY_TWO_HOURS_MS);
  });
});
