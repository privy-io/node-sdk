import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import { PrivyClient } from '@privy-io/node';
import { formatRequestForAuthorizationSignature } from '@privy-io/node/lib/authorization';
import { generateP256KeyPair, importPKCS8PrivateKey } from '@privy-io/node/lib/cryptography';

const APP_ID = 'test-app-id';
const API_URL = 'https://api.privy.io';
/** An identifier containing characters that the generated client percent-encodes in path segments. */
const ESCAPED_ID = 'w 1/x';
const ENCODED_ID = 'w%201%2Fx';

type CapturedRequest = { method: string; url: string; headers: Headers; body: unknown };

describe('authorization signatures over percent-encoded path identifiers', () => {
  let privateKey: string;
  let publicKey: Uint8Array;
  let requests: CapturedRequest[];
  let client: PrivyClient;

  beforeAll(async () => {
    ({ privateKey } = await generateP256KeyPair());
    publicKey = p256.getPublicKey(importPKCS8PrivateKey(privateKey));
  });

  beforeEach(() => {
    requests = [];
    const fetch = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
      requests.push({
        method: init?.method ?? 'GET',
        url: url.toString(),
        headers: new Headers(init?.headers),
        body: init?.body ? JSON.parse(init.body as string) : {},
      });
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    };
    client = new PrivyClient({
      appId: APP_ID,
      appSecret: 'test-app-secret',
      apiUrl: API_URL,
      maxRetries: 0,
      fetch,
    });
  });

  /** Verifies that the sent signature covers the transmitted method, URL, body and Privy headers. */
  function expectSignatureMatchesTransmittedRequest(request: CapturedRequest) {
    const signature = request.headers.get('privy-authorization-signature');
    expect(signature).toBeTruthy();

    const idempotencyKey = request.headers.get('privy-idempotency-key');
    const requestExpiry = request.headers.get('privy-request-expiry');
    const payload = formatRequestForAuthorizationSignature({
      version: 1,
      method: request.method as 'POST' | 'PATCH' | 'DELETE',
      url: request.url,
      body: request.body,
      headers: {
        'privy-app-id': request.headers.get('privy-app-id')!,
        ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
        ...(requestExpiry && { 'privy-request-expiry': requestExpiry }),
      },
    });

    const valid = p256.verify(Buffer.from(signature!, 'base64'), sha256(payload), publicKey, {
      format: 'der',
      prehash: false,
    });
    expect(valid).toBe(true);
  }

  const authorization_context = () => ({ authorization_private_keys: [privateKey] });

  it('wallets().rpc()', async () => {
    await client.wallets().rpc(ESCAPED_ID, {
      method: 'personal_sign',
      params: { message: 'hello', encoding: 'utf-8' },
      authorization_context: authorization_context(),
      idempotency_key: 'idem-key',
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.url).toBe(`${API_URL}/v1/wallets/${ENCODED_ID}/rpc`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });

  it('wallets().update()', async () => {
    await client.wallets().update(ESCAPED_ID, {
      policy_ids: [],
      authorization_context: authorization_context(),
    });

    expect(requests[0]!.url).toBe(`${API_URL}/v1/wallets/${ENCODED_ID}`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });

  it('wallets().swaps().quote()', async () => {
    await client
      .wallets()
      .swaps()
      .quote(ESCAPED_ID, {
        base_amount: '1',
        source: { asset_address: 'native', caip2: 'eip155:8453' },
        destination: { asset_address: 'destination-asset' },
        authorization_context: authorization_context(),
      });

    expect(requests[0]!.url).toBe(`${API_URL}/v1/wallets/${ENCODED_ID}/swap/quote`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });

  it('wallets().earn().ethereum().deposit()', async () => {
    await client.wallets().earn().ethereum().deposit(ESCAPED_ID, {
      vault_id: 'vault-id',
      amount: '1',
      authorization_context: authorization_context(),
    });

    expect(requests[0]!.url).toBe(`${API_URL}/v1/wallets/${ENCODED_ID}/earn/ethereum/deposit`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });

  it('policies().updateRule() with two escaped identifiers', async () => {
    await client.policies().updateRule('r 1/y', {
      policy_id: ESCAPED_ID,
      name: 'rule',
      method: 'eth_sendTransaction',
      action: 'ALLOW',
      conditions: [],
      authorization_context: authorization_context(),
    });

    expect(requests[0]!.url).toBe(`${API_URL}/v1/policies/${ENCODED_ID}/rules/r%201%2Fy`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });

  it('keyQuorums().delete()', async () => {
    await client.keyQuorums().delete(ESCAPED_ID, { authorization_context: authorization_context() });

    expect(requests[0]!.method).toBe('DELETE');
    expect(requests[0]!.url).toBe(`${API_URL}/v1/key_quorums/${ENCODED_ID}`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });

  it('leaves identifiers that need no escaping unchanged', async () => {
    await client.wallets().rpc('wallet-id', {
      method: 'personal_sign',
      params: { message: 'hello', encoding: 'utf-8' },
      authorization_context: authorization_context(),
    });

    expect(requests[0]!.url).toBe(`${API_URL}/v1/wallets/wallet-id/rpc`);
    expectSignatureMatchesTransmittedRequest(requests[0]!);
  });
});
