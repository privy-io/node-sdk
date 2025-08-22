import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';
import { Hex, verifyMessage } from 'viem';

describe('PrivyWalletsService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_APP_SERVER_URL = process.env['TEST_APP_SERVER_URL']!;
  const FUNDED_ETHEREUM_WALLET_ID = process.env['FUNDED_ETHEREUM_WALLET_ID']!;
  const FUNDED_ETHEREUM_WALLET_ADDRESS = process.env['FUNDED_ETHEREUM_WALLET_ADDRESS']! as Hex;

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_APP_SERVER_URL,
    });
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
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, 'Hello, world!');

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
          message: 'Hello, world!',
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a hex-encoded message', async () => {
        const response = await privyClient
          .wallets()
          .ethereum()
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, '0x1234567890');

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
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
          .signMessage(FUNDED_ETHEREUM_WALLET_ID, message);

        expect(response.signature).toBeDefined();
        const verified = await verifyMessage({
          address: FUNDED_ETHEREUM_WALLET_ADDRESS,
          message: { raw: message },
          signature: response.signature as `0x${string}`,
        });
        expect(verified).toBe(true);
      });
    });
  });
});
