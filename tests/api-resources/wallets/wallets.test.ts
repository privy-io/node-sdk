// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource wallets', () => {
  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.wallets.create({
      chain_type: 'ethereum',
      additional_signers: [{ signer_id: 'string', override_policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] }],
      display_name: 'display_name',
      external_id: 'my-order-123',
      owner: { user_id: 'user_id' },
      owner_id: 'string',
      policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
      'privy-idempotency-key': 'privy-idempotency-key',
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.wallets.list(
        {
          authorization_key: 's=-/fw-L-+N\n',
          chain_type: 'ethereum',
          cursor: 'x',
          external_id: 'external_id',
          limit: 100,
          user_id: 'user_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PrivyAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('_export: only required params', async () => {
    const responsePromise = client.wallets._export('wallet_id', {
      encryption_type: 'HPKE',
      recipient_public_key:
        'BDAZLOIdTaPycEYkgG0MvCzbIKJLli/yWkAV5yCa9yOsZ4JsrLweA5MnP8YIiY4k/RRzC+APhhO+P+Hoz/rt7Go=',
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
  test.skip('_export: required and optional params', async () => {
    const response = await client.wallets._export('wallet_id', {
      encryption_type: 'HPKE',
      recipient_public_key:
        'BDAZLOIdTaPycEYkgG0MvCzbIKJLli/yWkAV5yCa9yOsZ4JsrLweA5MnP8YIiY4k/RRzC+APhhO+P+Hoz/rt7Go=',
      export_seed_phrase: true,
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('_initImport: only required params', async () => {
    const responsePromise = client.wallets._initImport({
      address: 'address',
      chain_type: 'ethereum',
      encryption_type: 'HPKE',
      entropy_type: 'hd',
      index: 0,
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
  test.skip('_initImport: required and optional params', async () => {
    const response = await client.wallets._initImport({
      address: 'address',
      chain_type: 'ethereum',
      encryption_type: 'HPKE',
      entropy_type: 'hd',
      index: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('_rawSign: only required params', async () => {
    const responsePromise = client.wallets._rawSign('wallet_id', {
      params: {
        bytes:
          '0a0234ea220809701d7a17a77e04408093e981a6335a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15417009bf59e27d2031a23a61e1590289fc3d21b3cd121541132b98ed6fb80a2d45f177cdef091ae2d9dc115418e80770a0bee581a633',
        encoding: 'hex',
        hash_function: 'sha256',
      },
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
  test.skip('_rawSign: required and optional params', async () => {
    const response = await client.wallets._rawSign('wallet_id', {
      params: {
        bytes:
          '0a0234ea220809701d7a17a77e04408093e981a6335a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15417009bf59e27d2031a23a61e1590289fc3d21b3cd121541132b98ed6fb80a2d45f177cdef091ae2d9dc115418e80770a0bee581a633',
        encoding: 'hex',
        hash_function: 'sha256',
      },
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('_rpc: only required params', async () => {
    const responsePromise = client.wallets._rpc('wallet_id', {
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

  // Mock server tests are disabled
  test.skip('_rpc: required and optional params', async () => {
    const response = await client.wallets._rpc('wallet_id', {
      method: 'eth_signTransaction',
      params: {
        transaction: {
          authorization_list: [
            {
              chain_id: 'string',
              contract: 'contract',
              nonce: 'string',
              r: 'string',
              s: 'string',
              y_parity: 0,
            },
          ],
          chain_id: 'string',
          data: 'string',
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
      wallet_id: 'wallet_id',
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('_submitImport: only required params', async () => {
    const responsePromise = client.wallets._submitImport({
      wallet: {
        address: '0xF1DBff66C993EE895C8cb176c30b07A559d76496',
        chain_type: 'ethereum',
        ciphertext: 'PRoRXygG+YYSDBXjCopNYZmx8Z6nvdl1D0lpePTYZdZI2VGfK+LkFt+GlEJqdoi9',
        encapsulated_key:
          'BOhR6xITDt5THJawHHJKrKdI9CBr2M/SDWzZZAaOW4gCMsSpC65U007WyKiwuuOVAo1BNm4YgcBBROuMmyIZXZk=',
        encryption_type: 'HPKE',
        entropy_type: 'private-key',
      },
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
  test.skip('_submitImport: required and optional params', async () => {
    const response = await client.wallets._submitImport({
      wallet: {
        address: '0xF1DBff66C993EE895C8cb176c30b07A559d76496',
        chain_type: 'ethereum',
        ciphertext: 'PRoRXygG+YYSDBXjCopNYZmx8Z6nvdl1D0lpePTYZdZI2VGfK+LkFt+GlEJqdoi9',
        encapsulated_key:
          'BOhR6xITDt5THJawHHJKrKdI9CBr2M/SDWzZZAaOW4gCMsSpC65U007WyKiwuuOVAo1BNm4YgcBBROuMmyIZXZk=',
        encryption_type: 'HPKE',
        entropy_type: 'private-key',
        hpke_config: {
          aad: 'aad',
          aead_algorithm: 'CHACHA20_POLY1305',
          info: 'info',
        },
      },
      additional_signers: [{ signer_id: 'string', override_policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] }],
      display_name: 'display_name',
      external_id: 'external_id',
      owner: { user_id: 'user_id' },
      owner_id: 'rkiz0ivz254drv1xw982v3jq',
      policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
    });
  });

  // Mock server tests are disabled
  test.skip('_transfer: only required params', async () => {
    const responsePromise = client.wallets._transfer('wallet_id', {
      destination: { address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2' },
      source: {
        amount: '10.5',
        asset: 'usdc',
        chain: 'base',
      },
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
  test.skip('_transfer: required and optional params', async () => {
    const response = await client.wallets._transfer('wallet_id', {
      destination: {
        address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2',
        asset: 'usdc',
        chain: 'base',
      },
      source: {
        amount: '10.5',
        asset: 'usdc',
        chain: 'base',
      },
      amount_type: 'exact_input',
      fee_configuration: { type: 'total_fee_bps', value: 50 },
      slippage_bps: 100,
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
      'privy-request-expiry': 'privy-request-expiry',
    });
  });

  // Mock server tests are disabled
  test.skip('_update', async () => {
    const responsePromise = client.wallets._update('wallet_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('authenticateWithJwt: only required params', async () => {
    const responsePromise = client.wallets.authenticateWithJwt({
      encryption_type: 'HPKE',
      recipient_public_key: 'DAQcDQgAEx4aoeD72yykviK+fckqE2CItVIGn1rCnvCXZ1HgpOcMEMialRmTrqIK4oZlYd1',
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

  // Mock server tests are disabled
  test.skip('authenticateWithJwt: required and optional params', async () => {
    const response = await client.wallets.authenticateWithJwt({
      encryption_type: 'HPKE',
      recipient_public_key: 'DAQcDQgAEx4aoeD72yykviK+fckqE2CItVIGn1rCnvCXZ1HgpOcMEMialRmTrqIK4oZlYd1',
      user_jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
    });
  });

  // Mock server tests are disabled
  test.skip('createBatch: only required params', async () => {
    const responsePromise = client.wallets.createBatch({
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

  // Mock server tests are disabled
  test.skip('createBatch: required and optional params', async () => {
    const response = await client.wallets.createBatch({
      wallets: [
        {
          chain_type: 'ethereum',
          additional_signers: [{ signer_id: 'string', override_policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] }],
          display_name: 'display_name',
          external_id: 'external_id',
          owner: { user_id: 'user_id' },
          owner_id: 'string',
          policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
        },
        {
          chain_type: 'solana',
          additional_signers: [{ signer_id: 'string', override_policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'] }],
          display_name: 'display_name',
          external_id: 'external_id',
          owner: { user_id: 'user_id' },
          owner_id: 'string',
          policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
        },
      ],
    });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('createWalletsWithRecovery: required and optional params', async () => {
    const response = await client.wallets.createWalletsWithRecovery({
      primary_signer: { subject_id: 'cm7oxq1el000e11o8iwp7d0d0' },
      recovery_user: { linked_accounts: [{ address: 'john@doe.com', type: 'email' }] },
      wallets: [
        {
          chain_type: 'ethereum',
          display_name: 'display_name',
          external_id: 'external_id',
          policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
        },
        {
          chain_type: 'solana',
          display_name: 'display_name',
          external_id: 'external_id',
          policy_ids: ['xxxxxxxxxxxxxxxxxxxxxxxx'],
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.wallets.get('wallet_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getWalletByAddress: only required params', async () => {
    const responsePromise = client.wallets.getWalletByAddress({
      address: '0xF1DBff66C993EE895C8cb176c30b07A559d76496',
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
  test.skip('getWalletByAddress: required and optional params', async () => {
    const response = await client.wallets.getWalletByAddress({
      address: '0xF1DBff66C993EE895C8cb176c30b07A559d76496',
    });
  });
});
