import { wrapFetchWithPayment } from '@privy-io/node';
import type { PrivyClient } from '@privy-io/node';

// Mock the x402 packages
jest.mock('@x402/fetch', () => ({
  wrapFetchWithPayment: jest.fn((fetch) => fetch),
  x402Client: jest.fn().mockImplementation(() => ({
    register: jest.fn().mockReturnThis(),
  })),
}));

jest.mock('@x402/evm/exact/client', () => ({
  registerExactEvmScheme: jest.fn(),
}));

jest.mock('@x402/svm/exact/client', () => ({
  registerExactSvmScheme: jest.fn(),
}));

jest.mock('@privy-io/node/viem', () => ({
  createViemAccount: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@privy-io/node/solana-kit', () => ({
  createSolanaKitSigner: jest.fn().mockImplementation(() => ({})),
}));

describe('wrapFetchWithPayment', () => {
  const mockWalletsGet = jest.fn();
  const mockPrivyClient = {
    wallets: () => ({ get: mockWalletsGet }),
  } as unknown as PrivyClient;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws error when no wallet configuration is provided', async () => {
    await expect(wrapFetchWithPayment({ client: mockPrivyClient })).rejects.toThrow(
      'At least one wallet configuration (evm or solana) must be provided',
    );
  });

  it('works with EVM wallet', async () => {
    const result = await wrapFetchWithPayment({
      client: mockPrivyClient,
      evm: { walletId: 'test-wallet-id', address: '0x1234567890123456789012345678901234567890' },
    });
    expect(typeof result).toBe('function');
  });

  it('works with Solana wallet', async () => {
    const result = await wrapFetchWithPayment({
      client: mockPrivyClient,
      solana: {
        walletId: 'test-wallet-id',
        address: 'SoLANaAddRess1234567890123456789012345678901234' as any,
      },
    });
    expect(typeof result).toBe('function');
  });

  it('fetches address from API when not provided', async () => {
    mockWalletsGet.mockResolvedValueOnce({
      id: 'test-wallet-id',
      address: '0xFetchedAddress1234567890123456789012345678',
    });

    await wrapFetchWithPayment({
      client: mockPrivyClient,
      evm: { walletId: 'test-wallet-id' },
    });

    expect(mockWalletsGet).toHaveBeenCalledWith('test-wallet-id');
  });

  it('skips API call when address is provided', async () => {
    await wrapFetchWithPayment({
      client: mockPrivyClient,
      evm: { walletId: 'test-wallet-id', address: '0x1234567890123456789012345678901234567890' },
    });

    expect(mockWalletsGet).not.toHaveBeenCalled();
  });
});
