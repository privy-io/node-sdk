import { PrivyClient } from '@privy-io/node';
import {
  createTronTransferRawData,
  tronBase58ToHex,
  verifyTronSignature,
  TRON_NILE_CAIP2,
} from '../../helpers/tron';
import {
  setupTestWalletResources,
  createTestWallets,
  TestWalletResources,
  TestWallet,
  WALLET_CASES,
} from '../test-setup';

describe('PrivyTronService', () => {
  let resources: TestWalletResources;
  let wallets: TestWallet[];
  let privyClient: PrivyClient;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    wallets = await createTestWallets(resources, 'tron');
    privyClient = resources.client;
  });

  describe.each(WALLET_CASES)('$ownership', ({ index }) => {
    let wallet: TestWallet;

    beforeEach(() => {
      wallet = wallets[index]!;
    });

    describe('signTransaction', () => {
      it('should be able to sign a transaction and verify the signature', async () => {
        const ownerHex = tronBase58ToHex(wallet.address);
        const rawData = createTronTransferRawData(ownerHex);

        const response = await privyClient
          .wallets()
          .tron()
          .signTransaction(wallet.id, {
            params: { raw_data: rawData },
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.signed_transaction).toBeDefined();
        expect(response.encoding).toBe('hex');
        // Verify it's a valid hex string
        expect(response.signed_transaction).toMatch(/^[0-9a-fA-F]+$/);

        // Verify the signature cryptographically
        const verified = verifyTronSignature(response.signed_transaction, ownerHex);
        expect(verified).toBe(true);
      });
    });

    // Skipped to not expend funds. Logic is shared with signing transactions so safe to not frequently test.
    describe.skip('sendTransaction', () => {
      it('should be able to send a transaction', async () => {
        const ownerHex = tronBase58ToHex(wallet.address);
        const rawData = createTronTransferRawData(ownerHex);

        const response = await privyClient
          .wallets()
          .tron()
          .sendTransaction(wallet.id, {
            params: { raw_data: rawData },
            caip2: TRON_NILE_CAIP2,
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.hash).toBeDefined();
        expect(response.transaction_id).toBeDefined();
        expect(response.caip2).toBeDefined();
      });
    });
  });
});
