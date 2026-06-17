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

  it('registers EVM scheme for EVM address', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
    });

    expect(registerExactEvmScheme).toHaveBeenCalledTimes(1);
    expect(registerExactSvmScheme).not.toHaveBeenCalled();
  });

  it('registers SVM scheme for Solana address', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '3NNMsXXYT2JNGAmYmYhJHoWJbU6uQBgGnajEJhkaj9Ts',
    });

    expect(registerExactSvmScheme).toHaveBeenCalledTimes(1);
    expect(registerExactEvmScheme).not.toHaveBeenCalled();
  });

  it('throws for invalid address', () => {
    expect(() =>
      createX402Client(mockClient, {
        walletId: 'test-wallet',
        address: 'invalid-address',
      }),
    ).toThrow('Invalid wallet address');
  });

  it('forwards chainId and sponsor to createViemAccount for EVM address', () => {
    const { createViemAccount: mockCreateViemAccount } = jest.requireMock('../src/viem');
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
      chainId: 8453,
      sponsor: true,
    });

    expect(mockCreateViemAccount).toHaveBeenCalledWith(
      mockClient,
      expect.objectContaining({ chainId: 8453, sponsor: true }),
    );
  });

  it('does not forward chainId and sponsor when not provided', () => {
    const { createViemAccount: mockCreateViemAccount } = jest.requireMock('../src/viem');
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
    });

    expect(mockCreateViemAccount).toHaveBeenCalledWith(
      mockClient,
      expect.not.objectContaining({ chainId: expect.anything(), sponsor: expect.anything() }),
    );
  });
});
