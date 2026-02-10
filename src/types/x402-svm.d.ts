declare module '@x402/svm' {
  import type { TransactionSigner } from '@solana/signers';

  export type ClientSvmSigner = TransactionSigner;

  export interface ClientSvmConfig {
    rpcUrl?: string;
  }

  export class ExactSvmScheme {
    constructor(signer: ClientSvmSigner, config?: ClientSvmConfig);
  }

  export function toClientSvmSigner(signer: ClientSvmSigner): ClientSvmSigner;
}

declare module '@x402/svm/exact/client' {
  import type { TransactionSigner } from '@solana/signers';

  export function registerExactSvmScheme(
    client: { register: (pattern: string, scheme: unknown) => void },
    options: { signer: TransactionSigner },
  ): void;
}
