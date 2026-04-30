import { Webhook } from 'svix';
import { PrivyAPIError } from '../../core/error';
import { Webhooks, type WebhookPayload } from '../../resources/webhooks';

export type { WebhookPayload } from '../../resources/webhooks';

/** @deprecated Use {@link WebhookPayload} instead. */
export type WebhookEvent = WebhookPayload;

export class PrivyWebhooksService {
  private webhookSigningSecret: string | undefined;
  private webhooksResource: Webhooks;

  constructor(webhooksResource: Webhooks, webhookSigningSecret?: string) {
    this.webhooksResource = webhooksResource;
    this.webhookSigningSecret = webhookSigningSecret;
  }

  /**
   * Verifies a webhook request by checking the svix signature and asserting the timestamp
   * is within tolerance to prevent replay attacks, then returns the typed event payload.
   *
   * @param input.payload The raw JSON string body of the webhook request, or a parsed object for backwards compat.
   * @param input.headers The webhook headers containing svix-id, svix-timestamp, and svix-signature.
   * @param input.signingSecret Optional per-call override for the webhook signing secret.
   * @returns The verified and typed webhook event payload.
   * @throws {InvalidWebhookError} If the signature is invalid or the timestamp is stale.
   */
  verify({ payload, headers, signingSecret }: PrivyWebhooksService.VerifyInput): WebhookPayload {
    const secret = signingSecret ?? this.webhookSigningSecret;
    if (!secret) {
      throw new InvalidWebhookError(
        'Webhook signing secret is required. Pass it to PrivyClient constructor or to verify().',
      );
    }

    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);

    try {
      const wh = new Webhook(secret);
      const svixHeaders = {
        'svix-id': headers['svix-id'],
        'svix-timestamp': headers['svix-timestamp'],
        'svix-signature': headers['svix-signature'],
      };
      wh.verify(body, svixHeaders);
    } catch (error) {
      if (error instanceof Error) {
        throw new InvalidWebhookError(`Webhook verification failed: ${error.message}`);
      }
      throw new InvalidWebhookError('Webhook verification failed');
    }

    return this.webhooksResource.unsafeUnwrap(body) as WebhookPayload;
  }
}

export namespace PrivyWebhooksService {
  export type VerifyInput = {
    /** The webhook request body — either the raw JSON string or a parsed object. Prefer passing the raw string for guaranteed signature integrity. */
    payload: string | object;
    /** The request headers. Must include svix-id, svix-timestamp, svix-signature. */
    headers: {
      'svix-id': string;
      'svix-timestamp': string;
      'svix-signature': string;
    };
    /** Per-call signing secret override. Falls back to client-level secret. */
    signingSecret?: string;
  };
}

export class InvalidWebhookError extends PrivyAPIError {}
