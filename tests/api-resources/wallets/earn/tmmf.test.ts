// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tmmf', () => {
  // Mock server tests are disabled
  test.skip('_deposit: only required params', async () => {
    const responsePromise = client.wallets._earn.tmmf._deposit('wallet_id', {
      amount: '1000.00',
      chain: 'ethereum_sepolia',
      deposit_asset: 'USDC',
      fund: 'WTGXX',
      order_type: 'secondary',
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
    const response = await client.wallets._earn.tmmf._deposit('wallet_id', {
      amount: '1000.00',
      chain: 'ethereum_sepolia',
      deposit_asset: 'USDC',
      fund: 'WTGXX',
      order_type: 'secondary',
      nonce: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      reference_id: 'x',
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('_withdraw: only required params', async () => {
    const responsePromise = client.wallets._earn.tmmf._withdraw('wallet_id', {
      chain: 'ethereum_sepolia',
      fund: 'WTGXX',
      order_type: 'primary',
      shares: '1000.000000',
      withdraw_asset: 'USDC',
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
    const response = await client.wallets._earn.tmmf._withdraw('wallet_id', {
      chain: 'ethereum_sepolia',
      fund: 'WTGXX',
      order_type: 'primary',
      shares: '1000.000000',
      withdraw_asset: 'USDC',
      nonce: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      reference_id: 'x',
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('listPositions', async () => {
    const responsePromise = client.wallets._earn.tmmf.listPositions('wallet_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listPositions: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.wallets._earn.tmmf.listPositions(
        'wallet_id',
        {
          chain: 'ethereum_sepolia',
          cursor: 'x',
          fund: 'WTGXX',
          limit: 1,
          provider: 'wisdomtree',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('register: only required params', async () => {
    const responsePromise = client.wallets._earn.tmmf.register('wallet_id', {
      chain: 'ethereum_sepolia',
      provider: 'wisdomtree',
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
  test.skip('register: required and optional params', async () => {
    const response = await client.wallets._earn.tmmf.register('wallet_id', {
      chain: 'ethereum_sepolia',
      provider: 'wisdomtree',
    });
  });
});
