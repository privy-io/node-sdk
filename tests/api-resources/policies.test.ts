// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from 'privy-api-client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource policies', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.policies.create({
      chain_type: 'ethereum',
      name: 'name',
      rules: [
        {
          action: 'ALLOW',
          conditions: [
            { field: 'to', field_source: 'ethereum_transaction', operator: 'eq', value: 'string' },
          ],
          method: 'eth_sendTransaction',
          name: 'name',
        },
      ],
      version: '1.0',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.policies.create({
      chain_type: 'ethereum',
      name: 'name',
      rules: [
        {
          action: 'ALLOW',
          conditions: [
            { field: 'to', field_source: 'ethereum_transaction', operator: 'eq', value: 'string' },
          ],
          method: 'eth_sendTransaction',
          name: 'name',
        },
      ],
      version: '1.0',
      owner: { public_key: 'public_key' },
      owner_id: 'owner_id',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.policies.update('xxxxxxxxxxxxxxxxxxxxxxxx', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete', async () => {
    const responsePromise = client.policies.delete('xxxxxxxxxxxxxxxxxxxxxxxx');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policies.delete(
        'xxxxxxxxxxxxxxxxxxxxxxxx',
        { 'privy-authorization-signature': 'privy-authorization-signature' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });
});
