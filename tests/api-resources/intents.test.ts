// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from '@privy-io/node';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource intents', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.intents.list();
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
      client.intents.list(
        {
          created_by_id: 'created_by_id',
          current_user_has_signed: 'true',
          cursor: 'x',
          intent_type: 'KEY_QUORUM',
          limit: 100,
          pending_member_id: 'pending_member_id',
          resource_id: 'resource_id',
          sort_by: 'created_at_desc',
          status: 'pending',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('createPolicyRule: only required params', async () => {
    const responsePromise = client.intents.createPolicyRule('policy_id', {
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
  test.skip('createPolicyRule: required and optional params', async () => {
    const response = await client.intents.createPolicyRule('policy_id', {
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
  });

  // Mock server tests are disabled
  test.skip('deletePolicyRule: only required params', async () => {
    const responsePromise = client.intents.deletePolicyRule('rule_id', { policy_id: 'policy_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deletePolicyRule: required and optional params', async () => {
    const response = await client.intents.deletePolicyRule('rule_id', { policy_id: 'policy_id' });
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.intents.get('intent_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('rpc: only required params', async () => {
    const responsePromise = client.intents.rpc('wallet_id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'message' },
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
  test.skip('rpc: required and optional params', async () => {
    const response = await client.intents.rpc('wallet_id', {
      method: 'personal_sign',
      params: { encoding: 'utf-8', message: 'message' },
      address: 'address',
      chain_type: 'ethereum',
    });
  });

  // Mock server tests are disabled
  test.skip('updateKeyQuorum', async () => {
    const responsePromise = client.intents.updateKeyQuorum('key_quorum_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updatePolicy', async () => {
    const responsePromise = client.intents.updatePolicy('policy_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updatePolicyRule: only required params', async () => {
    const responsePromise = client.intents.updatePolicyRule('rule_id', {
      policy_id: 'policy_id',
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
  test.skip('updatePolicyRule: required and optional params', async () => {
    const response = await client.intents.updatePolicyRule('rule_id', {
      policy_id: 'policy_id',
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
  });

  // Mock server tests are disabled
  test.skip('updateWallet', async () => {
    const responsePromise = client.intents.updateWallet('wallet_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
