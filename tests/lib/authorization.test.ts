import { PrivyClient, generateP256KeyPair } from '@privy-io/node';
import { numberOfSigners, prepareRequest } from '@privy-io/node/lib/authorization';

const APP_ID = 'test-app-id';
const API_URL = 'https://api.example.test';
const WALLET_ID = 'wallet-id';

type CapturedRequest = { url: string; headers: Headers };

function createCapturingClient(responseBody: unknown) {
  const requests: CapturedRequest[] = [];
  const fetch = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
    requests.push({ url: String(url), headers: new Headers(init?.headers) });
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };
  const client = new PrivyClient({
    appId: APP_ID,
    appSecret: 'test-app-secret',
    apiUrl: API_URL,
    maxRetries: 0,
    fetch,
  });
  return { client, requests };
}

const rpcInput = {
  method: 'personal_sign' as const,
  params: { message: 'hello', encoding: 'utf-8' as const },
};

const rpcResponse = { method: 'personal_sign', data: { signature: '0x', encoding: 'hex' } };

describe('prepareRequest', () => {
  const { client } = createCapturingClient({});
  const request = {
    method: 'POST' as const,
    url: `${API_URL}/v1/wallets/${WALLET_ID}/rpc`,
    body: rpcInput,
  };

  it('omits the signature header when the authorization context is missing', async () => {
    const { headers } = await prepareRequest(client, APP_ID, request);
    expect(headers).not.toHaveProperty('privy-authorization-signature');
  });

  it('omits the signature header when the authorization context is empty', async () => {
    const { headers } = await prepareRequest(client, APP_ID, {
      ...request,
      authorizationContext: { authorization_private_keys: [], user_jwts: [], signatures: [], sign_fns: [] },
    });
    expect(headers).not.toHaveProperty('privy-authorization-signature');
  });

  it('joins multiple signatures with commas and no spaces', async () => {
    const { headers } = await prepareRequest(client, APP_ID, {
      ...request,
      authorizationContext: { signatures: ['sig-a', 'sig-b'], sign_fns: [async () => 'sig-c'] },
    });
    expect(headers['privy-authorization-signature']).toBe('sig-a,sig-b,sig-c');
  });
});

describe('authorization signature header on the wire', () => {
  it('is not sent for wallets().rpc() without an authorization context', async () => {
    const { client, requests } = createCapturingClient(rpcResponse);

    await client.wallets().rpc(WALLET_ID, rpcInput);

    expect(requests).toHaveLength(1);
    expect(requests[0]!.headers.has('privy-authorization-signature')).toBe(false);
  });

  it('is not sent for wallets().update() with an empty authorization context', async () => {
    const { client, requests } = createCapturingClient({});

    await client.wallets().update(WALLET_ID, { authorization_context: {} });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.headers.has('privy-authorization-signature')).toBe(false);
  });

  it('is sent comma-joined for wallets().rpc() when the authorization context produces signatures', async () => {
    const { client, requests } = createCapturingClient(rpcResponse);
    const keypair = await generateP256KeyPair();

    await client.wallets().rpc(WALLET_ID, {
      ...rpcInput,
      authorization_context: {
        signatures: ['precomputed-sig'],
        authorization_private_keys: [keypair.privateKey],
      },
    });

    expect(requests).toHaveLength(1);
    const header = requests[0]!.headers.get('privy-authorization-signature');
    expect(header).not.toBeNull();
    expect(header).not.toContain(' ');
    const parts = header!.split(',');
    expect(parts).toHaveLength(2);
    expect(parts[0]).toBe('precomputed-sig');
    expect(parts[1]).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});

describe('numberOfSigners', () => {
  it('counts every source of signatures', () => {
    expect(
      numberOfSigners({
        signatures: ['signature'],
        authorization_private_keys: ['private-key-1', 'private-key-2'],
        user_jwts: ['jwt-1'],
        user_auth: [{ user_jwt: 'jwt-2', mfa_token: 'mfa-token' }],
        sign_fns: [async () => 'signature'],
      }),
    ).toBe(6);
  });

  it('counts a JWT given in both user_jwts and user_auth once', () => {
    expect(
      numberOfSigners({
        user_jwts: ['jwt'],
        user_auth: [{ user_jwt: 'jwt', mfa_token: 'mfa-token' }],
      }),
    ).toBe(1);
  });

  it('counts an empty authorization context as zero', () => {
    expect(numberOfSigners({})).toBe(0);
  });
});
