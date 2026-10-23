declare module '@x402/core/client' {
  interface PaymentRequirements {
    scheme: string;
    network: string;
    amount: string;
    asset: string;
    payTo: string;
    maxTimeoutSeconds: number;
    extra?: Record<string, unknown>;
  }

  export interface SpendControlAsset {
    network: string;
    asset: string;
    maxAmountPerPayment?: string;
  }

  export interface SpendControls {
    maxAmountPerPayment?: string | number | false;
    allowedAssets?: true | SpendControlAsset[];
  }

  export type PaymentPolicy = (
    x402Version: number,
    paymentRequirements: PaymentRequirements[],
  ) => PaymentRequirements[];

  export interface PaymentCreationContext {
    paymentRequired: unknown;
    selectedRequirements: PaymentRequirements;
  }
}

declare module '@x402/fetch' {
  import type { PaymentCreationContext, PaymentPolicy, SpendControls } from '@x402/core/client';

  export class x402Client {
    setSpendControls(controls: SpendControls | false): x402Client;
    registerPolicy(policy: PaymentPolicy): x402Client;
    onBeforePaymentCreation(hook: (context: PaymentCreationContext) => Promise<void>): x402Client;
    createPaymentPayload(paymentRequired: unknown): Promise<unknown>;
  }
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
