// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from '@privy-io/node';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource rules', () => {
  // Prism tests are disabled
  test.skip('_create: only required params', async () => {
    const responsePromise = client.policies.rules._create('xxxxxxxxxxxxxxxxxxxxxxxx', {
      action: 'ALLOW',
      conditions: [{ field: 'to', field_source: 'ethereum_transaction', operator: 'eq', value: 'string' }],
      method: 'eth_sendTransaction',
      name: 'name',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('_create: required and optional params', async () => {
    const response = await client.policies.rules._create('xxxxxxxxxxxxxxxxxxxxxxxx', {
      action: 'ALLOW',
      conditions: [{ field: 'to', field_source: 'ethereum_transaction', operator: 'eq', value: 'string' }],
      method: 'eth_sendTransaction',
      name: 'name',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Prism tests are disabled
  test.skip('_delete: only required params', async () => {
    const responsePromise = client.policies.rules._delete('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('_delete: required and optional params', async () => {
    const response = await client.policies.rules._delete('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Prism tests are disabled
  test.skip('_update: only required params', async () => {
    const responsePromise = client.policies.rules._update('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      action: 'ALLOW',
      conditions: [{ field: 'to', field_source: 'ethereum_transaction', operator: 'eq', value: 'string' }],
      method: 'eth_sendTransaction',
      name: 'name',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('_update: required and optional params', async () => {
    const response = await client.policies.rules._update('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      action: 'ALLOW',
      conditions: [{ field: 'to', field_source: 'ethereum_transaction', operator: 'eq', value: 'string' }],
      method: 'eth_sendTransaction',
      name: 'name',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Prism tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.policies.rules.get('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('get: required and optional params', async () => {
    const response = await client.policies.rules.get('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    });
  });
});
