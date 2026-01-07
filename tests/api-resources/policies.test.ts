// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource policies', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.policies.create({
      chain_type: 'ethereum',
      name: 'x',
      rules: [
        {
          action: 'ALLOW',
          conditions: [
            {
              field: 'to',
              field_source: 'ethereum_transaction',
              operator: 'eq',
              value: 'string',
            },
          ],
          method: 'eth_sendTransaction',
          name: 'x',
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

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.policies.create({
      chain_type: 'ethereum',
      name: 'x',
      rules: [
        {
          action: 'ALLOW',
          conditions: [
            {
              field: 'to',
              field_source: 'ethereum_transaction',
              operator: 'eq',
              value: 'string',
            },
          ],
          method: 'eth_sendTransaction',
          name: 'x',
        },
      ],
      version: '1.0',
      owner: { public_key: 'public_key' },
      owner_id: 'owner_id',
      'privy-idempotency-key': 'privy-idempotency-key',
    });
  });

  // Prism tests are disabled
  test.skip('_createRule: only required params', async () => {
    const responsePromise = client.policies._createRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      action: 'ALLOW',
      conditions: [
        {
          field: 'to',
          field_source: 'ethereum_transaction',
          operator: 'eq',
          value: 'string',
        },
      ],
      method: 'eth_sendTransaction',
      name: 'x',
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
  test.skip('_createRule: required and optional params', async () => {
    const response = await client.policies._createRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      action: 'ALLOW',
      conditions: [
        {
          field: 'to',
          field_source: 'ethereum_transaction',
          operator: 'eq',
          value: 'string',
        },
      ],
      method: 'eth_sendTransaction',
      name: 'x',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Prism tests are disabled
  test.skip('_delete', async () => {
    const responsePromise = client.policies._delete('xxxxxxxxxxxxxxxxxxxxxxxx');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('_delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policies._delete(
        'xxxxxxxxxxxxxxxxxxxxxxxx',
        { 'privy-authorization-signature': 'privy-authorization-signature' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('_deleteRule: only required params', async () => {
    const responsePromise = client.policies._deleteRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
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
  test.skip('_deleteRule: required and optional params', async () => {
    const response = await client.policies._deleteRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Prism tests are disabled
  test.skip('_update', async () => {
    const responsePromise = client.policies._update('xxxxxxxxxxxxxxxxxxxxxxxx', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('_updateRule: only required params', async () => {
    const responsePromise = client.policies._updateRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      action: 'ALLOW',
      conditions: [
        {
          field: 'to',
          field_source: 'ethereum_transaction',
          operator: 'eq',
          value: 'string',
        },
      ],
      method: 'eth_sendTransaction',
      name: 'x',
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
  test.skip('_updateRule: required and optional params', async () => {
    const response = await client.policies._updateRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      action: 'ALLOW',
      conditions: [
        {
          field: 'to',
          field_source: 'ethereum_transaction',
          operator: 'eq',
          value: 'string',
        },
      ],
      method: 'eth_sendTransaction',
      name: 'x',
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.policies.get('xxxxxxxxxxxxxxxxxxxxxxxx');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getRule: only required params', async () => {
    const responsePromise = client.policies.getRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
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
  test.skip('getRule: required and optional params', async () => {
    const response = await client.policies.getRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    });
  });
});
