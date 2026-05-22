import { createWalletClient, http } from 'viem';
import { tempo } from 'viem/chains';
import { tempoActions } from 'viem/tempo';
import type { PrivyClient } from '../src/public-api/PrivyClient';
import { createViemAccount } from '../src/viem';

declare const privy: PrivyClient;

const walletId = 'wallet-id';
const address = '0x0000000000000000000000000000000000000001';
const recipient = '0x0000000000000000000000000000000000000002';
const feeToken = '0x20c000000000000000000000b9537d11c60e8b50';

const account = createViemAccount(privy, { walletId, address });
const walletClient = createWalletClient({
  account,
  chain: tempo,
  transport: http(),
}).extend(tempoActions());

async function typecheckTempoWalletClient() {
  await walletClient.sendTransaction({
    type: 'tempo',
    calls: [{ to: recipient, data: '0x' }],
    feeToken,
  });

  await walletClient.sendTransaction({
    calls: [{ to: recipient, data: '0x' }],
    feeToken,
  });

  await walletClient.token.transferSync({
    token: feeToken,
    to: recipient,
    amount: 1n,
    feeToken,
  });
}

void typecheckTempoWalletClient;
