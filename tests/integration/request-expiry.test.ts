import { PrivyClient, type PrivyClientOptions } from '@privy-io/node';

function makeClient(overrides: Partial<PrivyClientOptions>): {
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

describe('request expiry opt-out', () => {
  it('sets privy-request-expiry header by default', async () => {
    const { client, captured } = makeClient({});

    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    expect(captured.request?.headers.get('privy-request-expiry')).toMatch(/^\d+$/);
  });

  it('omits privy-request-expiry header when disableRequestExpiry is true', async () => {
    const { client, captured } = makeClient({ disableRequestExpiry: true });

    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    expect(captured.request?.headers.get('privy-request-expiry')).toBeNull();
  });

  it('disableRequestExpiry supersedes defaultRequestExpiryMs', async () => {
    const { client, captured } = makeClient({
      defaultRequestExpiryMs: 30 * 60 * 1000,
      disableRequestExpiry: true,
    });

    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    expect(captured.request?.headers.get('privy-request-expiry')).toBeNull();
  });

  it('reads defaultMs from the nested requestExpiry option', async () => {
    const tenMinutes = 10 * 60 * 1000;
    const { client, captured } = makeClient({
      requestExpiry: { defaultMs: tenMinutes },
    });
    const before = Date.now();

    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'hello' },
    });

    const after = Date.now();
    const header = captured.request?.headers.get('privy-request-expiry');
    expect(header).toMatch(/^\d+$/);
    const expiry = Number(header);
    expect(expiry).toBeGreaterThanOrEqual(before + tenMinutes);
    expect(expiry).toBeLessThanOrEqual(after + tenMinutes);
  });
});
