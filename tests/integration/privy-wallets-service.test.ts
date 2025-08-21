import { ecdsaVerify } from 'secp256k1';
import { AuthorizationContext } from 'privy-api-client/public-api/AuthorizationContext';
import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { hexToBytes, verifyMessage } from 'viem';
import { generateP256KeyPair, publicKeyToPem } from '../helpers/authorization';

describe('PrivyWalletsService', () => {
  const authorizationContext = new AuthorizationContext({});

  let privyClient: PrivyClient;
  let fundedEthereumWalletId: string;
  let fundedEthereumWalletAddress: `0x${string}`;
  let tronWalletId: string;
  let tronPublicKey: string;
  beforeAll(() => {
    privyClient = PrivyClient.create({
      appId: 'cm0mrhl8o0016smw051sykncb',
      appSecret: '3mnvvLz2jmWXTegeRB3V5U1WyzirAiccHjmdZ87sPbYSykGFhbm2kv4k2Qe8q3yEBghivNCfsyyjGq5tYPWCQ8fL',
      serverUrl: 'https://api.staging.privy.io',
    });
    fundedEthereumWalletId = 'gzees03aa4ixz0rk3kxsmg70';
    fundedEthereumWalletAddress = '0xc17a2B47c29E5Bf638A6338b69bbDC468296754D';
    tronWalletId = 'rmnw5g1uhdt6j1nh0kawu7z9';
    tronPublicKey = '02dae9a056cb7f6e383559980e6d39c52b8f33b22b266ea69879cbe4d82abf0002';
  });
  describe('create', () => {
    it.skip('should be able to create a new ethereum wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'ethereum',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('ethereum');
    });
    it.skip('should be able to create a new solana wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'solana',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('solana');
    });
    it.skip('should be able to create a new tron wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'tron',
      });

      console.log(walletResponse);

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('tron');
    });
  });
  describe('ethereum', () => {
    describe('personal sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(fundedEthereumWalletId, 'Hello, world!', authorizationContext);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: fundedEthereumWalletAddress,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a hex-encoded message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(fundedEthereumWalletId, '0x1234567890', authorizationContext);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: fundedEthereumWalletAddress,
          message: { raw: '0x1234567890' },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a byte array message', async () => {
        const message = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(fundedEthereumWalletId, message, authorizationContext);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: fundedEthereumWalletAddress,
          message: { raw: message },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
    });
  });
  describe('other chains', () => {
    describe('raw sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient
          .wallets()
          .rawSign(
            tronWalletId,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            authorizationContext,
          );

        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${tronPublicKey}`);

        const verified = ecdsaVerify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with an authorization context', async () => {
        const { publicKey, privateKey } = await generateP256KeyPair();
        const publicKeyPem = publicKeyToPem(publicKey);
        const privateKeyPKCS8 = privateKey.toString('base64');

        // Create a Tier 2 (e.g. Tron) wallet owned by the new key pair
        const createdWallet = await privyClient.wallets().create({
          chain_type: 'tron',
          owner: { public_key: publicKeyPem },
        });

        // Set up the authorization context
        const authorizationContext = new AuthorizationContext({
          authorizationPrivateKeys: [privateKeyPKCS8],
        });

        const response = await privyClient
          .wallets()
          .rawSign(
            createdWallet.id,
            { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
            authorizationContext,
          );

        expect(response.encoding).toBe('hex');
        expect(response.signature).toBeDefined();
        expect(response.signature).toMatch(/^0x[0-9a-f]+$/);

        const hashBytes = hexToBytes('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
        const signatureBytes = hexToBytes(response.signature as `0x${string}`);
        const publicKeyBytes = hexToBytes(`0x${createdWallet.public_key}`);

        const verified = ecdsaVerify(signatureBytes, hashBytes, publicKeyBytes);
        expect(verified).toBe(true);
      });
    });
  });
});
