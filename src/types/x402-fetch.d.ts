declare module '@x402/fetch' {
  export class x402Client {
    constructor();
    register(network: string, scheme: unknown): this;
    registerV1(network: string, scheme: unknown): this;
    registerPolicy(policy: unknown): this;
    createPaymentPayload(paymentRequired: unknown): Promise<unknown>;
  }

  export class x402HTTPClient {
    constructor(client: x402Client);
    encodePaymentSignatureHeader(paymentPayload: unknown): Record<string, string>;
    getPaymentRequiredResponse(
      getHeader: (name: string) => string | null | undefined,
      body?: unknown,
    ): unknown;
    getPaymentSettleResponse(getHeader: (name: string) => string | null | undefined): unknown;
    createPaymentPayload(paymentRequired: unknown): Promise<unknown>;
  }

  export function wrapFetchWithPayment(
    fetch: typeof globalThis.fetch,
    client: x402Client | x402HTTPClient,
  ): (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

  export function decodePaymentResponseHeader(header: string): unknown;
}
