// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource denylist', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.apps.denylist.create('app_id', {
      type: 'email',
      value: 'dev@stainless.com',
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
    const response = await client.apps.denylist.create('app_id', {
      type: 'email',
      value: 'dev@stainless.com',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.apps.denylist.list('app_id');
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
      client.apps.denylist.list('app_id', { cursor: 'x', limit: 100 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.apps.denylist.delete('app_id', { id: 'clpa828s4001hl90f6dxoksrg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.apps.denylist.delete('app_id', { id: 'clpa828s4001hl90f6dxoksrg' });
  });
});
