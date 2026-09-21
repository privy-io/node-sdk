// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource crypto', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.wallets.depositAccounts.crypto.list('wallet_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.wallets.depositAccounts.crypto.list(
        'wallet_id',
        { cursor: 'x', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('_create: only required params', async () => {
    const responsePromise = client.wallets.depositAccounts.crypto._create('wallet_id', {
      deposit_config_id: 'x',
      type: 'deposit_config',
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
  test.skip('_create: required and optional params', async () => {
    const response = await client.wallets.depositAccounts.crypto._create('wallet_id', {
      deposit_config_id: 'x',
      type: 'deposit_config',
      deposit_address_strategy: 'dedicated',
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('getConfig', async () => {
    const responsePromise = client.wallets.depositAccounts.crypto.getConfig();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getNextOrder: only required params', async () => {
    const responsePromise = client.wallets.depositAccounts.crypto.getNextOrder('wallet_id', {
      after: '2019-12-27T18:11:19.117Z',
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
  test.skip('getNextOrder: required and optional params', async () => {
    const response = await client.wallets.depositAccounts.crypto.getNextOrder('wallet_id', {
      after: '2019-12-27T18:11:19.117Z',
    });
  });

  // Mock server tests are disabled
  test.skip('quote: only required params', async () => {
    const responsePromise = client.wallets.depositAccounts.crypto.quote({
      destination: { asset: 'usdc', chain: 'base' },
      source: { asset: 'eth', chain: 'ethereum' },
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
  test.skip('quote: required and optional params', async () => {
    const response = await client.wallets.depositAccounts.crypto.quote({
      destination: { asset: 'usdc', chain: 'base' },
      source: { asset: 'eth', chain: 'ethereum' },
      input_amount: '0.02',
      slippage_bps: 50,
    });
  });
});
