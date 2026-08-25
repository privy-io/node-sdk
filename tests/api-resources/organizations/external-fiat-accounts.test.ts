// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from '@privy-io/node';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalFiatAccounts', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.organizations.externalFiatAccounts.create('organization_id', {
      account: {
        account_number: 'x',
        routing_number: 'xxxxxxxxx',
        type: 'us',
      },
      account_owner_name: 'xxx',
      currency: 'currency',
      provider: 'bridge',
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
    const response = await client.organizations.externalFiatAccounts.create('organization_id', {
      account: {
        account_number: 'x',
        routing_number: 'xxxxxxxxx',
        type: 'us',
        checking_or_savings: 'checking_or_savings',
      },
      account_owner_name: 'xxx',
      currency: 'currency',
      provider: 'bridge',
      address: {
        city: 'x',
        country: 'xxx',
        street_line_1: 'x',
        postal_code: 'x',
        state: 'x',
        street_line_2: 'x',
      },
      bank_name: 'x',
      environment: 'sandbox',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.organizations.externalFiatAccounts.list('organization_id', {
      provider: 'bridge',
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
  test.skip('list: required and optional params', async () => {
    const response = await client.organizations.externalFiatAccounts.list('organization_id', {
      provider: 'bridge',
      environment: 'sandbox',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.organizations.externalFiatAccounts.delete('account_id', {
      organization_id: 'organization_id',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.organizations.externalFiatAccounts.delete('account_id', {
      organization_id: 'organization_id',
    });
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.organizations.externalFiatAccounts.get('account_id', {
      organization_id: 'organization_id',
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
  test.skip('get: required and optional params', async () => {
    const response = await client.organizations.externalFiatAccounts.get('account_id', {
      organization_id: 'organization_id',
    });
  });
});
