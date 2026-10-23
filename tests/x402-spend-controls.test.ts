import type { PrivyClient } from '@privy-io/node';

import { createX402Client } from '../src/x402';

const EVM_WALLET_ADDRESS = '0x1111111111111111111111111111111111111111';
const EVM_PAYEE_ADDRESS = '0x2222222222222222222222222222222222222222';
const BASE_USDC_ADDRESS = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
const DISALLOWED_EVM_ASSET = '0x3333333333333333333333333333333333333333';
const SOLANA_WALLET_ADDRESS = '3NNMsXXYT2JNGAmYmYhJHoWJbU6uQBgGnajEJhkaj9Ts';
const SOLANA_PAYEE_ADDRESS = '8Z7o2S6q3V9nW1xP5kL4jH8mQ2rT6yU9cA3bD7eF1gK';
const SOLANA_USDC_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const SOLANA_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';

const createEvmPaymentRequired = ({
  amount,
  asset = BASE_USDC_ADDRESS,
  network = 'eip155:8453',
}: {
  amount: string;
  asset?: string;
  network?: string;
}) => ({
  x402Version: 2,
  resource: {
    url: 'https://merchant.example/resource',
    description: 'Test resource',
    mimeType: 'application/json',
  },
  accepts: [
    {
      scheme: 'exact',
      network,
      amount,
      asset,
      payTo: EVM_PAYEE_ADDRESS,
      maxTimeoutSeconds: 300,
      extra: { name: 'USD Coin', version: '2' },
    },
  ],
});

const createSolanaPaymentRequired = ({
  amount,
  asset = SOLANA_USDC_ADDRESS,
}: {
  amount: string;
  asset?: string;
}) => ({
  x402Version: 2,
  resource: {
    url: 'https://merchant.example/resource',
    description: 'Test resource',
    mimeType: 'application/json',
  },
  accepts: [
    {
      scheme: 'exact',
      network: SOLANA_MAINNET,
      amount,
      asset,
      payTo: SOLANA_PAYEE_ADDRESS,
      maxTimeoutSeconds: 300,
    },
  ],
});

const createRecordingPrivyClient = () => {
  const signTypedData = jest.fn().mockResolvedValue({
    signature: `0x${'11'.repeat(65)}`,
  });
  const wallets = jest.fn(() => ({
    ethereum: () => ({ signTypedData }),
  }));

  return {
    client: { wallets } as unknown as PrivyClient,
    signTypedData,
    wallets,
  };
};

describe('createX402Client spending controls', () => {
  it.each([
    ['an oversized EVM payment', createEvmPaymentRequired({ amount: '1000001' })],
    ['a disallowed EVM asset', createEvmPaymentRequired({ amount: '1', asset: DISALLOWED_EVM_ASSET })],
    ['a malformed EVM amount', createEvmPaymentRequired({ amount: '1e3' })],
    ['an unsupported EVM network', createEvmPaymentRequired({ amount: '1', network: 'eip155:999999' })],
  ])('does not call the signer for %s', async (_name, paymentRequired) => {
    const { client, wallets } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
    });

    await expect(x402client.createPaymentPayload(paymentRequired)).rejects.toThrow();
    expect(wallets).not.toHaveBeenCalled();
  });

  it('does not call the signer for an oversized Solana payment', async () => {
    const { client, wallets } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: SOLANA_WALLET_ADDRESS,
    });

    await expect(
      x402client.createPaymentPayload(createSolanaPaymentRequired({ amount: '1000001' })),
    ).rejects.toThrow();
    expect(wallets).not.toHaveBeenCalled();
  });

  it('does not fall through a malformed decoy to an oversized payment', async () => {
    const { client, wallets } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
    });
    const paymentRequired = createEvmPaymentRequired({ amount: '1000001' });
    paymentRequired.accepts.unshift({
      ...paymentRequired.accepts[0]!,
      amount: '1',
      asset: null as unknown as string,
    });

    await expect(x402client.createPaymentPayload(paymentRequired)).rejects.toThrow();
    expect(wallets).not.toHaveBeenCalled();
  });

  it('signs a valid EVM USDC payment at the default cap', async () => {
    const { client, signTypedData } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
    });

    await expect(
      x402client.createPaymentPayload(createEvmPaymentRequired({ amount: '1000000' })),
    ).resolves.toBeDefined();
    expect(signTypedData).toHaveBeenCalledTimes(1);
  });

  it('allows an explicit spending-control override', async () => {
    const { client, signTypedData } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
      spendControls: { maxAmountPerPayment: '$2' },
    });

    await expect(
      x402client.createPaymentPayload(createEvmPaymentRequired({ amount: '2000000' })),
    ).resolves.toBeDefined();
    expect(signTypedData).toHaveBeenCalledTimes(1);
  });

  it('allows an asset only when spending controls are explicitly disabled', async () => {
    const { client, signTypedData } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
      spendControls: false,
    });

    await expect(
      x402client.createPaymentPayload(createEvmPaymentRequired({ amount: '1', asset: DISALLOWED_EVM_ASSET })),
    ).resolves.toBeDefined();
    expect(signTypedData).toHaveBeenCalledTimes(1);
  });

  it('allows filtering policies that preserve approved requirements', async () => {
    const { client, signTypedData } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
      paymentPolicy: (_x402Version, requirements) => requirements.filter(() => true),
    });

    await expect(
      x402client.createPaymentPayload(createEvmPaymentRequired({ amount: '1' })),
    ).resolves.toBeDefined();
    expect(signTypedData).toHaveBeenCalledTimes(1);
  });

  it('rejects payment requirements transformed after spending controls run', async () => {
    const { client, wallets } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
      paymentPolicy: (_x402Version, requirements) =>
        requirements.map((requirement) => ({ ...requirement, amount: '1000001' })),
    });

    await expect(x402client.createPaymentPayload(createEvmPaymentRequired({ amount: '1' }))).rejects.toThrow(
      'Invalid x402 payment requirements.',
    );
    expect(wallets).not.toHaveBeenCalled();
  });

  it('prevents deferred in-place mutation after spending controls run', async () => {
    const { client, signTypedData } = createRecordingPrivyClient();
    const x402client = createX402Client(client, {
      walletId: 'test-wallet',
      address: EVM_WALLET_ADDRESS,
      paymentPolicy: (_x402Version, requirements) => {
        queueMicrotask(() => {
          try {
            requirements[0]!.amount = '1000001';
          } catch {
            // Requirements are frozen before application policies run.
          }
        });
        return requirements;
      },
    });

    const payload = await x402client.createPaymentPayload(createEvmPaymentRequired({ amount: '1' }));

    expect((payload as { accepted: { amount: string } }).accepted.amount).toBe('1');
    expect(signTypedData).toHaveBeenCalledTimes(1);
  });
});
