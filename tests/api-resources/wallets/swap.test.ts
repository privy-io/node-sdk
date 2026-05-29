// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PrivyAPI from '@privy-io/node';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource swap', () => {
  // Mock server tests are disabled
  test.skip('execute: only required params', async () => {
    const responsePromise = client.wallets.swap.execute('wallet_id', {
      base_amount: '1000000000000000000',
      destination: { asset_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
      source: { asset_address: 'native', caip2: 'eip155:1' },
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
  test.skip('execute: required and optional params', async () => {
    const response = await client.wallets.swap.execute('wallet_id', {
      base_amount: '1000000000000000000',
      destination: {
        asset_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        caip2: 'eip155:1',
        destination_address: 'destination_address',
      },
      source: { asset_address: 'native', caip2: 'eip155:1' },
      amount_type: 'exact_input',
      fee_configuration: { type: 'total_fee_bps', value: 50 },
      slippage_bps: 50,
      'privy-authorization-signature': 'privy-authorization-signature',
      'privy-idempotency-key': 'privy-idempotency-key',
    });
  });

  // Mock server tests are disabled
  test.skip('quote: only required params', async () => {
    const responsePromise = client.wallets.swap.quote('wallet_id', {
      base_amount: '1000000000000000000',
      destination: { asset_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
      source: { asset_address: 'native', caip2: 'eip155:1' },
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
  test.skip('quote: required and optional params', async () => {
    const response = await client.wallets.swap.quote('wallet_id', {
      base_amount: '1000000000000000000',
      destination: {
        asset_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        caip2: 'eip155:1',
        destination_address: 'destination_address',
      },
      source: { asset_address: 'native', caip2: 'eip155:1' },
      amount_type: 'exact_input',
      fee_configuration: { type: 'total_fee_bps', value: 50 },
      slippage_bps: 0,
      'privy-authorization-signature': 'privy-authorization-signature',
    });
  });
});
