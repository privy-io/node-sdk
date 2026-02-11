import { PrivyClient, generateP256KeyPair } from '@privy-io/node';
import crypto from 'node:crypto';
import { TEST_APP } from '../test-config';

/**
 * Converts a PEM-formatted public key to DER format (base64-encoded).
 * PEM format has headers/footers and base64 content with newlines.
 * DER is the raw binary ASN.1 encoding, which we return as base64.
 */
function pemToDerBase64(pemPublicKey: string): string {
  // Remove PEM headers/footers and whitespace
  const base64Content = pemPublicKey
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s+/g, '');

  // The base64 content in PEM *is* the DER encoding in base64
  return base64Content;
}

describe('Wallet Authorization Key Query', () => {
  let privyClient: PrivyClient;

  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });

  describe('fetch wallet by authorization key', () => {
    it('should create a 2-of-2 key quorum wallet and fetch it using authorization_key query param', async () => {
      // Step 1: Generate two P256 keypairs for the 2-of-2 quorum
      const keypair1 = await generateP256KeyPair();
      const keypair2 = await generateP256KeyPair();

      console.log('Generated keypair1 public key (PEM):', keypair1.publicKey);
      console.log('Generated keypair2 public key (PEM):', keypair2.publicKey);

      // Step 2: Create a 2-of-2 key quorum with both public keys
      const keyQuorum = await privyClient.keyQuorums().create({
        public_keys: [keypair1.publicKey, keypair2.publicKey],
        authorization_threshold: 2,
        display_name: `Test 2-of-2 Key Quorum ${Date.now()}`,
      });

      expect(keyQuorum.id).toBeDefined();
      expect(keyQuorum.authorization_threshold).toBe(2);
      expect(keyQuorum.authorization_keys).toHaveLength(2);

      console.log('Created key quorum:', keyQuorum.id);

      // Step 3: Create a wallet owned by the key quorum
      const wallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner_id: keyQuorum.id,
      });

      expect(wallet.id).toBeDefined();
      expect(wallet.owner_id).toBe(keyQuorum.id);

      console.log('Created wallet:', wallet.id, 'address:', wallet.address);

      // Step 4: Convert the public key to DER format (base64) and URL-encode it
      const derBase64 = pemToDerBase64(keypair1.publicKey);
      const urlEncodedKey = encodeURIComponent(derBase64);

      console.log('DER Base64:', derBase64);
      console.log('URL-encoded key:', urlEncodedKey);

      // Step 5: Fetch the wallet using the authorization_key query parameter
      // Using fetch directly since the SDK may not expose this endpoint
      const apiUrl = TEST_APP.apiUrl || 'https://api.privy.io';
      const url1 = `${apiUrl}/v1/wallets?authorization_key=${urlEncodedKey}`;
      console.log(`request url1: ${url1}`);
      const response = await fetch(url1, {
        method: 'GET',
        headers: {
          'privy-app-id': TEST_APP.id,
          Authorization: `Basic ${Buffer.from(`${TEST_APP.id}:${TEST_APP.secret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('GET /v1/wallets response status:', response.status);

      const responseBody = await response.json();
      console.log('Response body:', JSON.stringify(responseBody, null, 2));

      expect(response.ok).toBe(true);
      expect(responseBody.data).toBeDefined();
      expect(Array.isArray(responseBody.data)).toBe(true);

      // The wallet we created should be in the results
      const foundWallet = responseBody.data.find((w: { id: string }) => w.id === wallet.id);
      expect(foundWallet).toBeDefined();
      expect(foundWallet.address).toBe(wallet.address);

      console.log('Successfully fetched wallet by authorization key!');

      // Cleanup: Delete the key quorum (requires authorization from both keys since it's 2-of-2)
      try {
        await privyClient.keyQuorums().delete(keyQuorum.id, {
          authorization_context: {
            authorization_private_keys: [keypair1.privateKey, keypair2.privateKey],
          },
        });
        console.log('Cleaned up key quorum:', keyQuorum.id);
      } catch (e) {
        console.log('Note: Could not cleanup key quorum (wallet may still be attached)');
      }
    });

    it('should fetch wallet using either authorization key from the quorum', async () => {
      // Generate two keypairs
      const keypair1 = await generateP256KeyPair();
      const keypair2 = await generateP256KeyPair();

      // Create 2-of-2 key quorum
      const keyQuorum = await privyClient.keyQuorums().create({
        public_keys: [keypair1.publicKey, keypair2.publicKey],
        authorization_threshold: 2,
        display_name: `Test Quorum for Auth Key Fetch ${Date.now()}`,
      });

      // Create wallet
      const wallet = await privyClient.wallets().create({
        chain_type: 'ethereum',
        owner_id: keyQuorum.id,
      });

      const apiUrl = TEST_APP.apiUrl || 'https://api.privy.io';
      const authHeader = `Basic ${Buffer.from(`${TEST_APP.id}:${TEST_APP.secret}`).toString('base64')}`;

      // Test fetching with keypair1's public key
      const derBase64Key1 = pemToDerBase64(keypair1.publicKey);
      console.log(
        `request url1: ${apiUrl}/v1/wallets?authorization_key=${encodeURIComponent(derBase64Key1)}`,
      );
      const response1 = await fetch(
        `${apiUrl}/v1/wallets?authorization_key=${encodeURIComponent(derBase64Key1)}`,
        {
          method: 'GET',
          headers: {
            'privy-app-id': TEST_APP.id,
            Authorization: authHeader,
          },
        },
      );

      expect(response1.ok).toBe(true);
      const body1 = await response1.json();
      expect(body1.data.some((w: { id: string }) => w.id === wallet.id)).toBe(true);

      // Test fetching with keypair2's public key
      const derBase64Key2 = pemToDerBase64(keypair2.publicKey);
      console.log(
        `request url2: ${apiUrl}/v1/wallets?authorization_key=${encodeURIComponent(derBase64Key2)}`,
      );
      const response2 = await fetch(
        `${apiUrl}/v1/wallets?authorization_key=${encodeURIComponent(derBase64Key2)}`,
        {
          method: 'GET',
          headers: {
            'privy-app-id': TEST_APP.id,
            Authorization: authHeader,
          },
        },
      );

      expect(response2.ok).toBe(true);
      const body2 = await response2.json();
      expect(body2.data.some((w: { id: string }) => w.id === wallet.id)).toBe(true);

      console.log('Wallet found using both authorization keys from the quorum!');
    });
  });
});
