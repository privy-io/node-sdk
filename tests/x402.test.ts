import { wrapFetchWithPayment } from '@privy-io/node';
import type { PrivyClient } from '@privy-io/node';

// Mock external dependencies
jest.mock('@x402/fetch', () => ({
  wrapFetchWithPayment: jest.fn((fetch) => fetch),
  x402Client: jest.fn().mockImplementation(() => ({})),
}));
jest.mock('@x402/evm/exact/client', () => ({ registerExactEvmScheme: jest.fn() }));
jest.mock('@x402/svm/exact/client', () => ({ registerExactSvmScheme: jest.fn() }));
jest.mock('@privy-io/node/viem', () => ({ createViemAccount: jest.fn() }));
jest.mock('@privy-io/node/solana-kit', () => ({ createSolanaKitSigner: jest.fn() }));

describe('wrapFetchWithPayment', () => {
  const mockWalletsGet = jest.fn();
  const mockClient = { wallets: () => ({ get: mockWalletsGet }) } as unknown as PrivyClient;

  beforeEach(() => jest.clearAllMocks());

  it('returns a fetch function for valid wallet', async () => {
    mockWalletsGet.mockResolvedValueOnce({
      address: '0x123',
      chain_type: 'ethereum',
    });

    const result = await wrapFetchWithPayment({
      client: mockClient,
      wallet: { walletId: 'test-wallet' },
    });

    expect(typeof result).toBe('function');
  });

  it('throws for unsupported chain type', async () => {
    mockWalletsGet.mockResolvedValueOnce({ address: 'x', chain_type: 'cosmos' });

    await expect(wrapFetchWithPayment({ client: mockClient, wallet: { walletId: 'test' } })).rejects.toThrow(
      'Unsupported chain type',
    );
  });
});
