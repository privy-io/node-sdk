// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from '@privy-io/node';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource balance', () => {
  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.wallets.balance.get('wallet_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.wallets.balance.get(
        'wallet_id',
        {
          token: 'string',
          asset: 'usdc',
          chain: 'ethereum',
          include_archived: true,
          include_currency: 'usd',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });
});
