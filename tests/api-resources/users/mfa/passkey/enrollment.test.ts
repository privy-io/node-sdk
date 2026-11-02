// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource enrollment', () => {
  // Mock server tests are disabled
  test.skip('init: only required params', async () => {
    const responsePromise = client.users.mfa.passkey.enrollment.init('user_id', {
      relying_party: 'https://example.com',
      user_jwt: 'x',
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
  test.skip('init: required and optional params', async () => {
    const response = await client.users.mfa.passkey.enrollment.init('user_id', {
      relying_party: 'https://example.com',
      user_jwt: 'x',
      mfa_token: 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('verify: only required params', async () => {
    const responsePromise = client.users.mfa.passkey.enrollment.verify('user_id', {
      credential: {
        id: 'id',
        client_extension_results: {},
        raw_id: 'raw_id',
        response: { attestation_object: 'attestation_object', client_data_json: 'client_data_json' },
        type: 'public-key',
      },
      user_jwt: 'x',
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
  test.skip('verify: required and optional params', async () => {
    const response = await client.users.mfa.passkey.enrollment.verify('user_id', {
      credential: {
        id: 'id',
        client_extension_results: {
          app_id: true,
          cred_props: { rk: true },
          hmac_create_secret: true,
        },
        raw_id: 'raw_id',
        response: {
          attestation_object: 'attestation_object',
          client_data_json: 'client_data_json',
          authenticator_data: 'authenticator_data',
          public_key: 'public_key',
          public_key_algorithm: 0,
          transports: ['string'],
        },
        type: 'public-key',
        authenticator_attachment: 'authenticator_attachment',
      },
      user_jwt: 'x',
    });
  });
});
