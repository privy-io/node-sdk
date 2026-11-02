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
    const responsePromise = client.users.mfa.email.enrollment.init('user_id', {
      email_address: 'dev@stainless.com',
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
    const response = await client.users.mfa.email.enrollment.init('user_id', {
      email_address: 'dev@stainless.com',
      user_jwt: 'x',
      mfa_token: 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('verify: only required params', async () => {
    const responsePromise = client.users.mfa.email.enrollment.verify('user_id', {
      code: 'xxxxxx',
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
    const response = await client.users.mfa.email.enrollment.verify('user_id', {
      code: 'xxxxxx',
      user_jwt: 'x',
    });
  });
});
