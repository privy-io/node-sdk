declare module '@x402/fetch' {
  export class x402Client {}
}

declare module '@x402/evm/exact/client' {
  import type { x402Client } from '@x402/fetch';
  import type { LocalAccount } from 'viem';
  export function registerExactEvmScheme(client: x402Client, options: { signer: LocalAccount }): x402Client;
}

declare module '@x402/svm/exact/client' {
  import type { x402Client } from '@x402/fetch';
  import type { TransactionSigner } from '@solana/kit';
  export function registerExactSvmScheme(
    client: x402Client,
    options: { signer: TransactionSigner },
  ): x402Client;
}
