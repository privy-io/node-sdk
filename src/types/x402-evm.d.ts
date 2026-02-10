declare module '@x402/evm' {
  import type { LocalAccount } from 'viem/accounts';

  export type ClientEvmSigner = LocalAccount;

  export class ExactEvmScheme {
    constructor(signer: ClientEvmSigner);
  }

  export function toClientEvmSigner(account: LocalAccount): ClientEvmSigner;
}

declare module '@x402/evm/exact/client' {
  import type { LocalAccount } from 'viem/accounts';

  export function registerExactEvmScheme(
    client: { register: (pattern: string, scheme: unknown) => void },
    options: { signer: LocalAccount },
  ): void;
}
