import { createX402Client } from '../src/x402';
import type { PrivyClient } from '@privy-io/node';
import { registerExactEvmScheme } from '@x402/evm/exact/client';
import { registerExactSvmScheme } from '@x402/svm/exact/client';

jest.mock('@x402/fetch', () => ({
  x402Client: jest.fn().mockImplementation(() => ({})),
}));
jest.mock('@x402/evm/exact/client', () => ({ registerExactEvmScheme: jest.fn() }));
jest.mock('@x402/svm/exact/client', () => ({ registerExactSvmScheme: jest.fn() }));
jest.mock('../src/viem', () => ({ createViemAccount: jest.fn() }));
jest.mock('../src/solana-kit', () => ({ createSolanaKitSigner: jest.fn() }));

describe('createX402Client', () => {
  const mockClient = {} as unknown as PrivyClient;

  beforeEach(() => jest.clearAllMocks());

  it('registers EVM scheme for ethereum chainType', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x123',
      chainType: 'ethereum',
    });

    expect(registerExactEvmScheme).toHaveBeenCalledTimes(1);
    expect(registerExactSvmScheme).not.toHaveBeenCalled();
  });

  it('registers SVM scheme for solana chainType', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '3NNMsXXYT2JNGAmYmYhJHoWJbU6uQBgGnajEJhkaj9Ts',
      chainType: 'solana',
    });

    expect(registerExactSvmScheme).toHaveBeenCalledTimes(1);
    expect(registerExactEvmScheme).not.toHaveBeenCalled();
  });

  it('throws for unsupported chain type', () => {
    expect(() =>
      createX402Client(mockClient, {
        walletId: 'test',
        address: 'x',
        // @ts-expect-error testing invalid chain type
        chainType: 'cosmos',
      }),
    ).toThrow('Unsupported chain type');
  });
});
