import { PrivyClient } from '@privy-io/node';
import { createViemAccount } from '@privy-io/node/viem';
import type { EthereumPersonalSignRpcInputParams } from '@privy-io/node/resources';
import type { SignableMessage } from 'viem';
import { keccak256, verifyMessage } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

// Public, unfunded test fixture. All requests are handled by the mock fetch below.
const signer = privateKeyToAccount(`0x${'1'.padStart(64, '0')}`);
const API_URL = 'https://privy.invalid';
const WALLET_ID = 'test-wallet';

type CapturedRequest = {
  url: string;
  method: string | undefined;
  headers: Headers;
  body: {
    method: string;
    chain_type: string;
    params: EthereumPersonalSignRpcInputParams;
  };
};

describe('createViemAccount.signMessage', () => {
  let requests: CapturedRequest[];
  let client: PrivyClient;

  beforeEach(() => {
    requests = [];
    client = new PrivyClient({
      appId: 'test-app',
      appSecret: 'test-secret',
      apiUrl: API_URL,
      maxRetries: 0,
      fetch: async (url, init) => {
        const body: CapturedRequest['body'] = JSON.parse(init!.body as string);
        requests.push({
          url: url.toString(),
          method: init?.method,
          headers: new Headers(init?.headers),
          body,
        });
        const bytes = Buffer.from(body.params.message, body.params.encoding === 'hex' ? 'hex' : 'utf8');
        const signature = await signer.signMessage({ message: { raw: bytes } });
        return new Response(
          JSON.stringify({ method: 'personal_sign', data: { signature, encoding: 'hex' } }),
          {
            headers: { 'content-type': 'application/json' },
          },
        );
      },
    });
  });

  const cases: [string, SignableMessage, EthereumPersonalSignRpcInputParams, string][] = [
    ['literal hex text', '0x6869', { message: '307836383639', encoding: 'hex' }, '307836383639'],
    ['ordinary text', 'hi', { message: 'hi', encoding: 'utf-8' }, '6869'],
    ['Unicode text', 'hé 🌍', { message: 'hé 🌍', encoding: 'utf-8' }, '68c3a920f09f8c8d'],
    ['empty text', '', { message: '', encoding: 'utf-8' }, ''],
    ['literal empty hex text', '0x', { message: '3078', encoding: 'hex' }, '3078'],
    ['non-hex prefixed text', '0xzz', { message: '30787a7a', encoding: 'hex' }, '30787a7a'],
    ['odd-length hex text', '0x1', { message: '307831', encoding: 'hex' }, '307831'],
    ['prefixed Unicode text', '0xé', { message: '3078c3a9', encoding: 'hex' }, '3078c3a9'],
    ['raw hex', { raw: '0x6869' }, { message: '6869', encoding: 'hex' }, '6869'],
    ['empty raw hex', { raw: '0x' }, { message: '', encoding: 'hex' }, ''],
    [
      'raw bytes',
      { raw: new Uint8Array([0, 0x68, 0x69, 0xff]) },
      { message: '006869ff', encoding: 'hex' },
      '006869ff',
    ],
    ['empty raw bytes', { raw: new Uint8Array() }, { message: '', encoding: 'hex' }, ''],
  ];

  it.each(cases)('signs %s using viem message semantics', async (_, message, params, expectedHex) => {
    const account = createViemAccount(client, { walletId: WALLET_ID, address: signer.address });
    const signature = await account.signMessage({ message });

    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      url: `${API_URL}/v1/wallets/${WALLET_ID}/rpc`,
      method: 'POST',
      body: { method: 'personal_sign', chain_type: 'ethereum', params },
    });

    // Build the EIP-191 preimage independently, including the byte length for Unicode.
    const bytes = Buffer.from(expectedHex, 'hex');
    const hash = keccak256(
      Buffer.concat([Buffer.from(`\x19Ethereum Signed Message:\n${bytes.length}`), bytes]),
    );
    expect(signature).toBe(await signer.sign({ hash }));
    expect(signature).toBe(await signer.signMessage({ message }));
    expect(await verifyMessage({ address: signer.address, message, signature })).toBe(true);
  });

  it('distinguishes literal hex text from explicit raw hex', async () => {
    const account = createViemAccount(client, { walletId: WALLET_ID, address: signer.address });
    const textSignature = await account.signMessage({ message: '0x6869' });
    const rawSignature = await account.signMessage({ message: { raw: '0x6869' } });

    expect(textSignature).not.toBe(rawSignature);
    expect(await verifyMessage({ address: signer.address, message: '0x6869', signature: rawSignature })).toBe(
      false,
    );
  });

  it('forwards authorization over the encoded request', async () => {
    const signRequest = jest.fn(async (_payload: Uint8Array) => 'test-authorization-signature');
    const account = createViemAccount(client, {
      walletId: WALLET_ID,
      address: signer.address,
      authorizationContext: { sign_fns: [signRequest] },
    });

    await account.signMessage({ message: '0x6869' });

    expect(signRequest).toHaveBeenCalledTimes(1);
    expect(requests).toHaveLength(1);
    const request = requests[0]!;
    expect(request.headers.get('privy-authorization-signature')).toBe('test-authorization-signature');
    const authorized = JSON.parse(new TextDecoder().decode(signRequest.mock.calls[0]![0]));
    expect(authorized).toEqual({
      version: 1,
      method: 'POST',
      url: request.url,
      body: request.body,
      headers: {
        'privy-app-id': 'test-app',
        'privy-request-expiry': request.headers.get('privy-request-expiry'),
      },
    });
    expect(authorized.body.params).toEqual({ message: '307836383639', encoding: 'hex' });
  });

  it('preserves the direct Ethereum service hex-string convenience', async () => {
    const { signature } = await client.wallets().ethereum().signMessage(WALLET_ID, { message: '0x6869' });

    expect(requests[0]!.body.params).toEqual({ message: '6869', encoding: 'hex' });
    expect(signature).toBe(await signer.signMessage({ message: { raw: '0x6869' } }));
  });
});
