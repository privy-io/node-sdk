import { PrivyClient } from '@privy-io/node';
import { createViemAccount } from '@privy-io/node/viem';
import type {
  AuthorizationRequest,
  Hex,
  LocalAccount,
  SignableMessage,
  TypedData,
  TypedDataDefinition,
} from 'viem';
import type { SignTransactionParameters } from 'viem/accounts';
import {
  keccak256,
  parseTransaction,
  serializeTransaction,
  verifyAuthorization,
  verifyHash,
  verifyMessage,
  verifyTypedData,
} from 'viem/utils';
import { generateTestJWT } from '../helpers/jwt-auth';

describe('viem utils', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  const P256_PRIVATE_KEY = process.env['P256_PRIVATE_KEY']!;

  const OWNERLESS_ETHEREUM_WALLET_ID = process.env['OWNERLESS_ETHEREUM_WALLET_ID']!;
  const OWNERLESS_ETHEREUM_WALLET_ADDRESS = process.env['OWNERLESS_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const P256_OWNED_ETHEREUM_WALLET_ID = process.env['P256_OWNED_ETHEREUM_WALLET_ID']!;
  const P256_OWNED_ETHEREUM_WALLET_ADDRESS = process.env['P256_OWNED_ETHEREUM_WALLET_ADDRESS']! as Hex;
  const USER_OWNED_ETHEREUM_WALLET_ID = process.env['USER_OWNED_ETHEREUM_WALLET_ID']!;
  const USER_OWNED_ETHEREUM_WALLET_ADDRESS = process.env['USER_OWNED_ETHEREUM_WALLET_ADDRESS']! as Hex;

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_API_URL,
    });
  });

  describe('createViemAccount', () => {
    describe.each([
      { owner: null, walletId: OWNERLESS_ETHEREUM_WALLET_ID, address: OWNERLESS_ETHEREUM_WALLET_ADDRESS },
      { owner: 'p256', walletId: P256_OWNED_ETHEREUM_WALLET_ID, address: P256_OWNED_ETHEREUM_WALLET_ADDRESS },
      { owner: 'user', walletId: USER_OWNED_ETHEREUM_WALLET_ID, address: USER_OWNED_ETHEREUM_WALLET_ADDRESS },
    ] as const)('for a wallet with owner:$owner', ({ owner, walletId, address }) => {
      let account: LocalAccount;
      beforeEach(async () => {
        account = createViemAccount(privyClient, {
          walletId,
          address,
          authorizationContext: {
            ...(owner === 'p256' ? { authorization_private_keys: [P256_PRIVATE_KEY] } : {}),
            ...(owner === 'user' ? { user_jwts: [await generateTestJWT()] } : {}),
          },
        });
      });
      it('should be able to sign a hash', async () => {
        const hash: Hex = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        const signature = await account.sign?.({ hash });
        expect(signature).toBeDefined();
        const verified = await verifyHash({ hash, signature: signature!, address });
        expect(verified).toBe(true);
      });
      it.each<[string, SignableMessage]>([
        ['utf-8 message', 'Hello, world!'],
        ['hex-encoded message', { raw: '0x1234567890' }],
        ['byte array', { raw: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) }],
      ])('should be able to sign over a %s', async (_, message) => {
        const signature = await account.signMessage({ message });
        expect(signature).toBeDefined();
        const verified = await verifyMessage({
          address,
          message,
          signature,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign typed data', async () => {
        const typedData: TypedDataDefinition<TypedData, keyof TypedData> = {
          domain: {
            name: 'Test',
            version: '1',
            chainId: 1,
            verifyingContract: '0x1234567890123456789012345678901234567890',
          },
          primaryType: 'Message' as const,
          types: { Message: [{ name: 'content', type: 'string' }] },
          message: { content: 'Hello world' },
        };

        const signature = await account.signTypedData(typedData);
        expect(signature).toBeDefined();
        const verified = await verifyTypedData({
          ...typedData,
          address,
          signature,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign 7702 authorization', async () => {
        const authorization: AuthorizationRequest = {
          contractAddress: '0x1234567890123456789012345678901234567890',
          chainId: 1,
          nonce: 1,
        };

        const signedAuthorization = await account.signAuthorization?.(authorization);
        expect(signedAuthorization).toBeDefined();
        const verified = await verifyAuthorization({
          address,
          authorization: signedAuthorization!,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a transaction', async () => {
        const unsignedTx: SignTransactionParameters['transaction'] = {
          type: 'eip1559',
          chainId: 1,
          to: '0x742D35Cc6634C0532925A3b844BC9e7095F49e22',
          value: 1n,
          gas: 21000n,
          data: '0x',
        };

        const signedTx = await account.signTransaction(unsignedTx);
        expect(signedTx).toBeDefined();

        const parsedTx = parseTransaction(signedTx);

        const verified = await verifyHash({
          hash: keccak256(serializeTransaction(unsignedTx)),
          address,
          signature: {
            r: parsedTx.r!,
            s: parsedTx.s!,
            yParity: parsedTx.yParity!,
          },
        });
        expect(verified).toBe(true);
      });
    });
  });
});
