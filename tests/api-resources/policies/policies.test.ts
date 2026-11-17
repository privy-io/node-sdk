// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource policies', () => {
  describe('ID validation', () => {
    const fetch = jest.fn<Promise<Response>, [string | URL | Request, RequestInit?]>(
      async () => new Response('{}', { headers: { 'content-type': 'application/json' } }),
    );
    const client = new PrivyAPI({
      appID: 'test-app-id',
      appSecret: 'test-app-secret',
      baseURL: 'http://localhost:4010',
      fetch,
    });

    beforeEach(() => fetch.mockClear());

    test('get rejects an empty policy ID before making a request', () => {
      expect(() => client.policies.get('')).toThrow('policyID must not be an empty string');
      expect(fetch).not.toHaveBeenCalled();
    });

    test('getRule rejects an empty rule ID before making a request', () => {
      expect(() => client.policies.getRule('', { policy_id: 'policy-id' })).toThrow(
        'ruleID must not be an empty string',
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    test('getRule rejects an empty policy ID before making a request', () => {
      expect(() => client.policies.getRule('rule-id', { policy_id: '' })).toThrow(
        'policy_id must not be an empty string',
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    test('get passes valid IDs and request options to the generated transport', async () => {
      await client.policies.get('policy-id', { headers: { 'x-test-header': 'test-value' } });

      expect(fetch).toHaveBeenCalledTimes(1);
      const [url, options] = fetch.mock.calls[0]!;
      expect(String(url)).toBe('http://localhost:4010/v1/policies/policy-id');
      expect(options?.method).toBe('GET');
      expect(new Headers(options?.headers).get('x-test-header')).toBe('test-value');
    });

    test('getRule passes valid IDs to the generated transport', async () => {
      await client.policies.getRule('rule-id', { policy_id: 'policy-id' });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4010/v1/policies/policy-id/rules/rule-id',
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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
          id: 'id',
        },
      ],
      version: '1.0',
      owner: { user_id: 'user_id' },
      owner_id: 'string',
      'privy-idempotency-key': 'privy-idempotency-key',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.policies.list();
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
      client.policies.list({ cursor: 'x', limit: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('_delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policies._delete(
        'xxxxxxxxxxxxxxxxxxxxxxxx',
        {
          'privy-authorization-signature': 'privy-authorization-signature',
          'privy-request-expiry': 'privy-request-expiry',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('_deleteRule: required and optional params', async () => {
    const response = await client.policies._deleteRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('getRule: required and optional params', async () => {
    const response = await client.policies.getRule('xxxxxxxxxxxxxxxxxxxxxxxx', {
      policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    });
  });
});
