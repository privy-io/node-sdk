// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource ethereum', () => {
  // Mock server tests are disabled
  test.skip('_deposit: only required params', async () => {
    const responsePromise = client.wallets._earn._ethereum._deposit('wallet_id', {
      vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('_deposit: required and optional params', async () => {
    const response = await client.wallets._earn._ethereum._deposit('wallet_id', {
      vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
      amount: '1.5',
      raw_amount: '321669910225',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Mock server tests are disabled
  test.skip('_withdraw: only required params', async () => {
    const responsePromise = client.wallets._earn._ethereum._withdraw('wallet_id', {
      vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('_withdraw: required and optional params', async () => {
    const response = await client.wallets._earn._ethereum._withdraw('wallet_id', {
      vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
      amount: '1.5',
      raw_amount: '321669910225',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });
});
