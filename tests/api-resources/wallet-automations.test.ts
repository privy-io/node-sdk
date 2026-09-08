// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource walletAutomations', () => {
  // Mock server tests are disabled
  test.skip('reindex: only required params', async () => {
    const responsePromise = client.walletAutomations.reindex({ asset_address: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('reindex: required and optional params', async () => {
    const response = await client.walletAutomations.reindex({
      asset_address: 'x',
      caip2: 'eip155:321669910225',
      chain: 'x',
      deposit_address: 'x',
      wallet_id: 'x',
    });
  });
});
