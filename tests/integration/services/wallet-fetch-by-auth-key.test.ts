import { PrivyClient, generateP256KeyPair } from '@privy-io/node';
import { TEST_APP } from '../test-config';

/**
 * Converts a PEM-formatted public key to DER format (base64-encoded).
 */
function pemToDerBase64(pemPublicKey: string): string {
  return pemPublicKey
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s+/g, '');
}

describe('Wallet Fetch by Authorization Key', () => {
  it('should fetch wallet using authorization_key query param', async () => {
    const privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });

    // Generate a keypair and create a key quorum + wallet
    const keypair = await generateP256KeyPair();
    console.log('Generated public key (PEM):', keypair.publicKey);

    const keyQuorum = await privyClient.keyQuorums().create({
      public_keys: [keypair.publicKey],
      authorization_threshold: 1,
      display_name: `Test Key Quorum ${Date.now()}`,
    });
    console.log('Created key quorum:', keyQuorum.id);

    const wallet = await privyClient.wallets().create({
      chain_type: 'ethereum',
      owner_id: keyQuorum.id,
    });
    console.log('Created wallet:', wallet.id, 'address:', wallet.address);

    // Convert to DER format
    const derBase64 = pemToDerBase64(keypair.publicKey);
    const urlEncodedKey = encodeURIComponent(derBase64);

    console.log('\n=== FOR SHARING ===');
    console.log('DER Base64 (raw):', derBase64);
    console.log('DER Base64 (URL-encoded):', urlEncodedKey);

    const apiUrl = TEST_APP.apiUrl || 'https://api.privy.io';
    const authHeader = `Basic ${Buffer.from(`${TEST_APP.id}:${TEST_APP.secret}`).toString('base64')}`;

    // Print curl command
    console.log('\n=== CURL COMMAND ===');
    console.log(`curl -X GET "${apiUrl}/v1/wallets?authorization_key=${urlEncodedKey}" \\
  -H "privy-app-id: ${TEST_APP.id}" \\
  -H "Authorization: Basic <base64(app_id:app_secret)>" \\
  -H "Content-Type: application/json"`);

    // Make the request
    const url = `${apiUrl}/v1/wallets?authorization_key=${urlEncodedKey}`;
    console.log('\nRequest URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'privy-app-id': TEST_APP.id,
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    const responseBody = await response.json();
    console.log('Response body:', JSON.stringify(responseBody, null, 2));

    expect(response.ok).toBe(true);
    expect(responseBody.data).toBeDefined();
    expect(Array.isArray(responseBody.data)).toBe(true);

    // The wallet we created should be in the results
    const foundWallet = responseBody.data.find((w: { id: string }) => w.id === wallet.id);
    expect(foundWallet).toBeDefined();
    expect(foundWallet.address).toBe(wallet.address);

    console.log('\nSuccessfully fetched wallet by authorization key!');
  });
});
