// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource walletAutomations', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.walletAutomations.create({
      config: {
        action: {
          destination_chain_asset: { asset_address: 'x', caip2: 'x' },
          type: 'swap',
        },
        trigger: {
          assets: { mode: 'all' },
          type: 'deposit',
        },
      },
      owner_id: 'x',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.walletAutomations.create({
      config: {
        action: {
          destination_chain_asset: {
            asset_address: 'x',
            caip2: 'x',
            asset: 'x',
            chain: 'x',
          },
          type: 'swap',
        },
        trigger: {
          assets: { mode: 'all' },
          type: 'deposit',
        },
      },
      owner_id: 'x',
      name: 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.walletAutomations.update('automation_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.walletAutomations.list();
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
      client.walletAutomations.list(
        {
          cursor: 'cursor',
          limit: 1,
          wallet_id: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.walletAutomations.delete('automation_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.walletAutomations.get('automation_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listExecutions', async () => {
    const responsePromise = client.walletAutomations.listExecutions();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listExecutions: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.walletAutomations.listExecutions(
        {
          cursor: 'cursor',
          limit: 1,
          wallet_id: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

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
      caip2: 'tron:mainnet',
      chain: 'x',
      deposit_address: 'x',
      wallet_id: 'x',
    });
  });
});
