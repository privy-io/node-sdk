// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource verification', () => {
  // Mock server tests are disabled
  test.skip('verify: only required params', async () => {
    const responsePromise = client.users.mfa.totp.verification.verify('user_id', {
      code: 'xxxxxx',
      'privy-user-token': 'x',
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
    const response = await client.users.mfa.totp.verification.verify('user_id', {
      code: 'xxxxxx',
      'privy-user-token': 'x',
    });
  });
});
