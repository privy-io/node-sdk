import { PrivyClient } from '@privy-io/node';

function makeClient(overrides: {
  disableRequestExpiry?: boolean;
  defaultRequestExpiryMs?: number;
}): { client: PrivyClient; captured: { request: Request | null } } {
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
      params: { message: 'hello' },
    } as any);

    expect(captured.request?.headers.get('privy-request-expiry')).toMatch(/^\d+$/);
  });

  it('omits privy-request-expiry header when disableRequestExpiry is true', async () => {
    const { client, captured } = makeClient({ disableRequestExpiry: true });

    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { message: 'hello' },
    } as any);

    expect(captured.request?.headers.get('privy-request-expiry')).toBeNull();
  });

  it('disableRequestExpiry supersedes defaultRequestExpiryMs', async () => {
    const { client, captured } = makeClient({
      defaultRequestExpiryMs: 30 * 60 * 1000,
      disableRequestExpiry: true,
    });

    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { message: 'hello' },
    } as any);

    expect(captured.request?.headers.get('privy-request-expiry')).toBeNull();
  });
});
