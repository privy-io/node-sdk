// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from 'privy-api-client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource wallets', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.wallets.create({ chain_type: 'ethereum' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.wallets.create({
      chain_type: 'ethereum',
      additional_signers: [{ override_policy_ids: ['string'], signer_id: 'signer_id' }],
      owner: { public_key: 'public_key' },
      owner_id: 'owner_id',
      policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.wallets.update('wallet_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.wallets.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.wallets.list(
        { chain_type: 'solana', cursor: 'x', limit: 100 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('authenticateWithJwt: only required params', async () => {
    const responsePromise = client.wallets.authenticateWithJwt({
      user_jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('authenticateWithJwt: required and optional params', async () => {
    const response = await client.wallets.authenticateWithJwt({
      user_jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
      encryption_type: 'HPKE',
      recipient_public_key: 'DAQcDQgAEx4aoeD72yykviK+fckqE2CItVIGn1rCnvCXZ1HgpOcMEMialRmTrqIK4oZlYd1',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('createWalletsWithRecovery: only required params', async () => {
    const responsePromise = client.wallets.createWalletsWithRecovery({
      primary_signer: { subject_id: 'cm7oxq1el000e11o8iwp7d0d0' },
      recovery_user: { linked_accounts: [{ address: 'john@doe.com', type: 'email' }] },
      wallets: [{ chain_type: 'ethereum' }, { chain_type: 'solana' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('createWalletsWithRecovery: required and optional params', async () => {
    const response = await client.wallets.createWalletsWithRecovery({
      primary_signer: { subject_id: 'cm7oxq1el000e11o8iwp7d0d0' },
      recovery_user: { linked_accounts: [{ address: 'john@doe.com', type: 'email' }] },
      wallets: [
        { chain_type: 'ethereum', policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] },
        { chain_type: 'solana', policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] },
      ],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('rpc: only required params', async () => {
    const responsePromise = client.wallets.rpc('wallet_id', {
      method: 'eth_signTransaction',
      params: { transaction: {} },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('rpc: required and optional params', async () => {
    const response = await client.wallets.rpc('wallet_id', {
      method: 'eth_signTransaction',
      params: {
        transaction: {
          chain_id: 'string',
          data: 'data',
          from: 'from',
          gas_limit: 'string',
          gas_price: 'string',
          max_fee_per_gas: 'string',
          max_priority_fee_per_gas: 'string',
          nonce: 'string',
          to: 'to',
          type: 0,
          value: 'string',
        },
      },
      address: 'address',
      chain_type: 'ethereum',
      body_wallet_id: 'wallet_id',
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
    });
  });
});
