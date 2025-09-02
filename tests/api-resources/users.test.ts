// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from '@privy-io/node';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource users', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.users.create({
      linked_accounts: [{ address: 'tom.bombadill@privy.io', type: 'email' }],
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
    const response = await client.users.create({
      linked_accounts: [{ address: 'tom.bombadill@privy.io', type: 'email' }],
      custom_metadata: { foo: 'string' },
      wallets: [
        {
          chain_type: 'solana',
          additional_signers: [{ signer_id: 'signer_id', override_policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] }],
          create_smart_wallet: true,
          policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
        },
      ],
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.users.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.list({ cursor: 'x', limit: 100 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.users.delete('user_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createCustomMetadata: only required params', async () => {
    const responsePromise = client.users.createCustomMetadata('user_id', {
      custom_metadata: { key: 'value' },
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
  test.skip('createCustomMetadata: required and optional params', async () => {
    const response = await client.users.createCustomMetadata('user_id', {
      custom_metadata: { key: 'value' },
    });
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.users.get('user_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByCustomAuthID: only required params', async () => {
    const responsePromise = client.users.getByCustomAuthID({ custom_user_id: 'custom_user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByCustomAuthID: required and optional params', async () => {
    const response = await client.users.getByCustomAuthID({ custom_user_id: 'custom_user_id' });
  });

  // Prism tests are disabled
  test.skip('getByDiscordUsername: only required params', async () => {
    const responsePromise = client.users.getByDiscordUsername({ username: 'username' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByDiscordUsername: required and optional params', async () => {
    const response = await client.users.getByDiscordUsername({ username: 'username' });
  });

  // Prism tests are disabled
  test.skip('getByEmailAddress: only required params', async () => {
    const responsePromise = client.users.getByEmailAddress({ address: 'dev@stainless.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByEmailAddress: required and optional params', async () => {
    const response = await client.users.getByEmailAddress({ address: 'dev@stainless.com' });
  });

  // Prism tests are disabled
  test.skip('getByFarcasterID: only required params', async () => {
    const responsePromise = client.users.getByFarcasterID({ fid: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByFarcasterID: required and optional params', async () => {
    const response = await client.users.getByFarcasterID({ fid: 0 });
  });

  // Prism tests are disabled
  test.skip('getByGitHubUsername: only required params', async () => {
    const responsePromise = client.users.getByGitHubUsername({ username: 'username' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByGitHubUsername: required and optional params', async () => {
    const response = await client.users.getByGitHubUsername({ username: 'username' });
  });

  // Prism tests are disabled
  test.skip('getByPhoneNumber: only required params', async () => {
    const responsePromise = client.users.getByPhoneNumber({ number: 'number' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByPhoneNumber: required and optional params', async () => {
    const response = await client.users.getByPhoneNumber({ number: 'number' });
  });

  // Prism tests are disabled
  test.skip('getBySmartWalletAddress: only required params', async () => {
    const responsePromise = client.users.getBySmartWalletAddress({ address: 'address' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getBySmartWalletAddress: required and optional params', async () => {
    const response = await client.users.getBySmartWalletAddress({ address: 'address' });
  });

  // Prism tests are disabled
  test.skip('getByTelegramUserID: only required params', async () => {
    const responsePromise = client.users.getByTelegramUserID({ telegram_user_id: 'telegram_user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByTelegramUserID: required and optional params', async () => {
    const response = await client.users.getByTelegramUserID({ telegram_user_id: 'telegram_user_id' });
  });

  // Prism tests are disabled
  test.skip('getByTelegramUsername: only required params', async () => {
    const responsePromise = client.users.getByTelegramUsername({ username: 'username' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByTelegramUsername: required and optional params', async () => {
    const response = await client.users.getByTelegramUsername({ username: 'username' });
  });

  // Prism tests are disabled
  test.skip('getByTwitterSubject: only required params', async () => {
    const responsePromise = client.users.getByTwitterSubject({ subject: 'subject' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByTwitterSubject: required and optional params', async () => {
    const response = await client.users.getByTwitterSubject({ subject: 'subject' });
  });

  // Prism tests are disabled
  test.skip('getByTwitterUsername: only required params', async () => {
    const responsePromise = client.users.getByTwitterUsername({ username: 'username' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByTwitterUsername: required and optional params', async () => {
    const response = await client.users.getByTwitterUsername({ username: 'username' });
  });

  // Prism tests are disabled
  test.skip('getByWalletAddress: only required params', async () => {
    const responsePromise = client.users.getByWalletAddress({ address: 'address' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getByWalletAddress: required and optional params', async () => {
    const response = await client.users.getByWalletAddress({ address: 'address' });
  });

  // Prism tests are disabled
  test.skip('pregenerateWallets: only required params', async () => {
    const responsePromise = client.users.pregenerateWallets('user_id', {
      wallets: [{ chain_type: 'ethereum' }],
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
  test.skip('pregenerateWallets: required and optional params', async () => {
    const response = await client.users.pregenerateWallets('user_id', {
      wallets: [
        {
          chain_type: 'ethereum',
          additional_signers: [{ signer_id: 'signer_id', override_policy_ids: ['string'] }],
          create_smart_wallet: true,
          policy_ids: ['string'],
        },
      ],
    });
  });

  // Prism tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.users.search({ search_term: 'search_term' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.users.search({ search_term: 'search_term' });
  });

  // Prism tests are disabled
  test.skip('unlinkLinkedAccount: only required params', async () => {
    const responsePromise = client.users.unlinkLinkedAccount('user_id', {
      handle: 'test@test.com',
      type: 'email',
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
  test.skip('unlinkLinkedAccount: required and optional params', async () => {
    const response = await client.users.unlinkLinkedAccount('user_id', {
      handle: 'test@test.com',
      type: 'email',
      provider: 'provider',
    });
  });
});
