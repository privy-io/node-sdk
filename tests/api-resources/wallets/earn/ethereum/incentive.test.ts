// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource incentive', () => {
  // Mock server tests are disabled
  test.skip('_claim: only required params', async () => {
    const responsePromise = client.wallets.earn.ethereum.incentive._claim('wallet_id', { chain: 'base' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('_claim: required and optional params', async () => {
    const response = await client.wallets.earn.ethereum.incentive._claim('wallet_id', {
      chain: 'base',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });
});
