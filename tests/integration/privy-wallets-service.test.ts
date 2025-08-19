import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { WalletRpcResponse } from 'privy-api-client/resources';
import { verifyMessage } from 'viem';

describe('PrivyWalletsService', () => {
  let privyClient: PrivyClient;
  let fundedEthereumWalletId: string;
  let fundedEthereumWalletAddress: `0x${string}`;
  beforeAll(() => {
    privyClient = PrivyClient.create({
      appId: 'cm0mrhl8o0016smw051sykncb',
      appSecret: '3mnvvLz2jmWXTegeRB3V5U1WyzirAiccHjmdZ87sPbYSykGFhbm2kv4k2Qe8q3yEBghivNCfsyyjGq5tYPWCQ8fL',
      serverUrl: 'https://api.staging.privy.io',
    });
    fundedEthereumWalletId = 'gzees03aa4ixz0rk3kxsmg70';
    fundedEthereumWalletAddress = '0xc17a2B47c29E5Bf638A6338b69bbDC468296754D';
  });
  describe.skip('create', () => {
    it('should be able to create a new ethereum wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'ethereum',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('ethereum');
    });
    it('should be able to create a new solana wallet', async () => {
      const walletResponse = await privyClient.wallets().create({
        chain_type: 'solana',
      });

      expect(walletResponse.id).toBeDefined();
      expect(walletResponse.address).toBeDefined();
      expect(walletResponse.chain_type).toBe('solana');
    });
  });
  describe('ethereum', () => {
    describe('personal sign', () => {
      it('should be able to sign a message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(fundedEthereumWalletId, 'Hello, world!');

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
          .signMessage(fundedEthereumWalletId, '0x1234567890');

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
        const response = await privyClient.wallets().ethereum().signMessage(fundedEthereumWalletId, message);

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
});
