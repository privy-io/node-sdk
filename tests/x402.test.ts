import { createX402Client } from '../src/x402';
import type { PrivyClient } from '@privy-io/node';
import { x402Client } from '@x402/fetch';
import { registerExactEvmScheme } from '@x402/evm/exact/client';
import { registerExactSvmScheme } from '@x402/svm/exact/client';
import { createViemAccount } from '../src/viem';

jest.mock('@x402/fetch', () => ({
  x402Client: jest.fn().mockImplementation(() => ({
    onBeforePaymentCreation: jest.fn().mockReturnThis(),
    registerPolicy: jest.fn().mockReturnThis(),
    setSpendControls: jest.fn().mockReturnThis(),
  })),
}));
jest.mock('@x402/evm/exact/client', () => ({ registerExactEvmScheme: jest.fn() }));
jest.mock('@x402/svm/exact/client', () => ({ registerExactSvmScheme: jest.fn() }));
jest.mock('../src/viem', () => ({ createViemAccount: jest.fn() }));
jest.mock('../src/solana-kit', () => ({ createSolanaKitSigner: jest.fn() }));

describe('createX402Client', () => {
  const mockClient = {} as unknown as PrivyClient;

  beforeEach(() => jest.clearAllMocks());

  const getCreatedX402Client = () =>
    jest.mocked(x402Client).mock.results.at(-1)?.value as {
      onBeforePaymentCreation: jest.Mock;
      registerPolicy: jest.Mock;
      setSpendControls: jest.Mock;
    };

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

  it('forwards signatureOptions to createViemAccount for EVM address', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
      signatureOptions: { type: 'erc1271' },
    });

    expect(createViemAccount).toHaveBeenCalledWith(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
      signatureOptions: { type: 'erc1271' },
    });
  });

  it('does not pass signatureOptions when not specified', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
    });

    expect(createViemAccount).toHaveBeenCalledWith(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
    });
  });

  it('uses x402 default spending controls when no override is provided', () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
    });

    const x402client = getCreatedX402Client();
    expect(x402client.setSpendControls).not.toHaveBeenCalled();
    expect(x402client.registerPolicy).toHaveBeenCalledTimes(1);
  });

  it('registers explicit spending controls and payment policy', () => {
    const paymentPolicy = jest.fn((_, requirements) => requirements);
    const spendControls = { maxAmountPerPayment: '$5' };

    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
      paymentPolicy,
      spendControls,
    });

    const x402client = getCreatedX402Client();
    expect(x402client.setSpendControls).toHaveBeenCalledWith(spendControls);
    expect(x402client.registerPolicy).toHaveBeenCalledWith(paymentPolicy);
    expect(x402client.registerPolicy).toHaveBeenCalledTimes(2);
  });

  it('rejects malformed selected requirements before payment creation', async () => {
    createX402Client(mockClient, {
      walletId: 'test-wallet',
      address: '0x1234567890123456789012345678901234567890',
    });

    const x402client = getCreatedX402Client();
    const selectedRequirements = {
      amount: '1.5',
      asset: '0x1234567890123456789012345678901234567890',
      network: 'eip155:8453',
    };
    const snapshotPolicy = x402client.registerPolicy.mock.calls[0]?.[0];
    snapshotPolicy(2, [selectedRequirements]);
    const hook = x402client.onBeforePaymentCreation.mock.calls[0]?.[0];
    await expect(
      hook({
        paymentRequired: {},
        selectedRequirements,
      }),
    ).rejects.toThrow('Invalid x402 payment requirements.');
  });
});
