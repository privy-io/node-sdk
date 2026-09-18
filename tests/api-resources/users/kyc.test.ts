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
      client_agreement_id: 'x',
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

  // Mock server tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.users.kyc.submit('user_id', {
      data: {},
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
  test.skip('submit: required and optional params', async () => {
    const response = await client.users.kyc.submit('user_id', {
      data: {
        date_of_birth: '7321-69-10',
        email: 'dev@stainless.com',
        first_name: 'x',
        identifying_information: [
          {
            issuing_country: 'xxx',
            type: 'type',
            description: 'description',
            expiration: 'expiration',
            image_back: 'image_back',
            image_front: 'image_front',
            number: 'number',
          },
        ],
        last_name: 'x',
        phone: 'phone',
        residential_address: {
          city: 'x',
          country: 'xxx',
          street_line_1: 'xxxx',
          postal_code: 'x',
          street_line_2: 'x',
          subdivision: 'x',
        },
      },
      provider: 'bridge',
      client_agreement_id: 'x',
      endorsements: ['sepa'],
      environment: 'production',
    });
  });
});
