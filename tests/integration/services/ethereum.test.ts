import { PrivyAPI } from '@privy-io/node/client';
import { PrivyEthereumService } from '@privy-io/node';
import { PrivyClient } from '@privy-io/node';
import { generateP256KeyPair } from '@privy-io/node';
import { Hex, verifyHash, verifyMessage, verifyTypedData } from 'viem';
import { verifyAuthorization } from 'viem/utils';

import { TEST_APP } from '../test-config';
import {
  setupTestWalletResources,
  createTestWallets,
  cleanupTestWalletResources,
  TestWalletResources,
  TestWallet,
  WALLET_CASES,
} from '../test-setup';

describe('PrivyEthereumService', () => {
  let resources: TestWalletResources;
  let wallets: TestWallet[];
  let privyClient: PrivyClient;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    wallets = await createTestWallets(resources, 'ethereum');
    privyClient = resources.client;
  });

  afterAll(async () => {
    if (resources) await cleanupTestWalletResources(resources);
  });
  describe('ethereum', () => {
    describe.each(WALLET_CASES)('$ownership', ({ index }) => {
      let wallet: TestWallet;

      beforeEach(() => {
        wallet = wallets[index]!;
      });

      describe('personal sign', () => {
        it('should be able to sign a message', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .signMessage(wallet.id, {
              message: 'Hello, world!',
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signature).toBeDefined();
          const verified = await verifyMessage({
            address: wallet.address as Hex,
            message: 'Hello, world!',
            signature: response.signature as `0x${string}`,
          });
          expect(verified).toBe(true);
        });
        it('should be able to sign a hex-encoded message', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .signMessage(wallet.id, {
              message: '0x1234567890',
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signature).toBeDefined();
          const verified = await verifyMessage({
            address: wallet.address as Hex,
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
            .signMessage(wallet.id, {
              message,
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signature).toBeDefined();
          const verified = await verifyMessage({
            address: wallet.address as Hex,
            message: { raw: message },
            signature: response.signature as `0x${string}`,
          });
          expect(verified).toBe(true);
        });
      });

      describe('secp256k1 sign', () => {
        it('should be able to sign a hash', async () => {
          const hash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
          const response = await privyClient
            .wallets()
            .ethereum()
            .signSecp256k1(wallet.id, {
              params: { hash },
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signature).toBeDefined();
          const signature = response.signature as Hex;

          const verified = await verifyHash({ hash, signature, address: wallet.address as Hex });
          expect(verified).toBe(true);
        });
      });

      describe('7702 authorization signing', () => {
        const authorization7702: PrivyEthereumService.Sign7702AuthorizationInput['params'] = {
          contract: '0x1234567890123456789012345678901234567890',
          chain_id: 1,
          nonce: 1,
        };
        it('should be able to sign a 7702 authorization', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .sign7702Authorization(wallet.id, {
              params: authorization7702,
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.authorization).toBeDefined();
          const signedAuthorization = response.authorization;

          const verified = await verifyAuthorization({
            address: wallet.address as Hex,
            authorization: {
              chainId: signedAuthorization.chain_id as number,
              address: signedAuthorization.contract as Hex,
              nonce: signedAuthorization.nonce as number,
              r: signedAuthorization.r as Hex,
              s: signedAuthorization.s as Hex,
              yParity: signedAuthorization.y_parity,
            },
          });
          expect(verified).toBe(true);
        });
      });

      describe('transaction signing', () => {
        const transaction: PrivyEthereumService.SignTransactionInput['params']['transaction'] = {
          type: 2,
          chain_id: 1,
          to: '0x742d35Cc6634C0532925a3b8D1A8a9ff1e7a7A4C',
          value: '0x1',
          gas_limit: '0x5208',
          data: '0x',
        };
        it('should be able to sign a transaction', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .signTransaction(wallet.id, {
              params: { transaction },
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signed_transaction).toBeDefined();
          expect(response.encoding).toBe('rlp');
          expect(response.signed_transaction).toMatch(/^0x[0-9a-fA-F]+$/);
        });
      });

      describe('typed data signing', () => {
        const typedData: PrivyEthereumService.SignTypedDataInput['params']['typed_data'] = {
          domain: {
            name: 'Test',
            version: '1',
            chainId: 1,
            verifyingContract: '0x1234567890123456789012345678901234567890',
          },
          primary_type: 'Message' as const,
          types: { Message: [{ name: 'content', type: 'string' }] },
          message: { content: 'Hello world' },
        };
        it('should be able to sign typed data', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .signTypedData(wallet.id, {
              params: { typed_data: typedData },
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signature).toBeDefined();
          expect(response.encoding).toBe('hex');
          const verified = await verifyTypedData({
            signature: response.signature as Hex,
            address: wallet.address as Hex,
            domain: typedData.domain,
            types: typedData.types,
            primaryType: typedData.primary_type,
            message: typedData.message,
          });
          expect(verified).toBe(true);
        });
      });

      describe('user operation signing', () => {
        const userOperation: PrivyEthereumService.SignUserOperationInput['params']['user_operation'] = {
          sender: '0xdf1Bff521006396b2dd11725681ebA6998DB37e3',
          nonce: '0x1000000000000000a',
          call_data:
            '0x34fcd5be000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000036cbd53842c5426634e7929541ec2318f3dcf7e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000cc9c3d98163f4f6af884e259132e15d6d27a5c57000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000',
          call_gas_limit: '0x877f',
          verification_gas_limit: '0x8550',
          pre_verification_gas: '0xbcc4',
          max_fee_per_gas: '0x18700',
          max_priority_fee_per_gas: '0x186a0',
          paymaster: '0x2cc0c7981D846b9F2a16276556f6e8cb52BfB633',
          paymaster_data:
            '0x000000000000000069174750fbd97f1583efc0158107838d694bb88594fc428f431892960194089ef4e15c8b330b402626cd01ce11057354528807581e7400e4edf33e15e3b55bcc6ef63fcf1c',
          paymaster_verification_gas_limit: '0x7680',
          paymaster_post_op_gas_limit: '0x00',
        };
        const userOperationParams: PrivyEthereumService.SignUserOperationInput['params'] = {
          chain_id: '0x66eee', // Arbitrum Sepolia
          contract: '0x69007702764179f14F51cdce752f4f775d74E139',
          user_operation: userOperation,
        };
        it('should be able to sign a user operation', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .signUserOperation(wallet.id, {
              params: userOperationParams,
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.signature).toBeDefined();
          expect(response.encoding).toBe('hex');
          expect(response.signature).toMatch(/^0x[0-9a-fA-F]+$/);
        });
      });

      // Skipped to not waste funds. Logic is shared with signing transactions so safe to not frequently test.
      describe.skip('transaction sending', () => {
        const sendTx: PrivyEthereumService.SendTransactionInput['params']['transaction'] = {
          to: '0x429c8e85D3A18F9F0a64a7A851777e24D591485C', // Some ethereum address
          value: '0x1', // 1 wei
          chain_id: 11_155_111, // sepolia testnet
        };
        it('should be able to send a transaction', async () => {
          const response = await privyClient
            .wallets()
            .ethereum()
            .sendTransaction(wallet.id, {
              caip2: 'eip155:11155111',
              params: { transaction: sendTx },
              ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
            });

          expect(response.hash).toBeDefined();
          expect(response.caip2).toBe('eip155:11155111');
          expect(response.hash).toMatch(/^0x[0-9a-fA-F]+$/);
        });
      });
    });
  });
});
