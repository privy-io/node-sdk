// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource kyc', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.users.kyc.list('user_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('initiateLinks: only required params', async () => {
    const responsePromise = client.users.kyc.initiateLinks('user_id', { provider: 'bridge' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('initiateLinks: required and optional params', async () => {
    const response = await client.users.kyc.initiateLinks('user_id', {
      provider: 'bridge',
      client_agreement_id: 'client_agreement_id',
      email: 'dev@stainless.com',
      endorsements: ['sepa'],
      environment: 'production',
      redirect_uri: 'https://example.com',
    });
  });

  // Mock server tests are disabled
  test.skip('initiateTos: only required params', async () => {
    const responsePromise = client.users.kyc.initiateTos('user_id', { provider: 'bridge' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('initiateTos: required and optional params', async () => {
    const response = await client.users.kyc.initiateTos('user_id', {
      provider: 'bridge',
      email: 'dev@stainless.com',
      environment: 'production',
    });
  });
});
