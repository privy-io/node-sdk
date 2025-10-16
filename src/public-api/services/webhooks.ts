import { Webhook } from 'svix';
import { PrivyAPIError } from '../../core/error';

export class PrivyWebhooksService {
  private webhookSigningSecret: string | undefined;

  constructor(webhookSigningSecret?: string) {
    this.webhookSigningSecret = webhookSigningSecret;
  }

  /**
   * Verifies a webhook request by checking the signature and asserting the timestamp is within 5
   * minutes of the current time to prevent replay attacks.
   *
   * @param input.payload The raw JSON payload/body of the webhook request. This must be unaltered or signature verification will fail.
   * @param input.headers A JSON object containing the webhook's ID, timestamp, and signature sent in the headers of the webhook request. This object must contain `id`, `timestamp`, and `signature` keys.
   * @param input.signing_secret The webhook secret to use for verifying the webhook request.
   * @returns verified payload if the webhook signature is valid otherwise throws.
   */
  async verify({ payload, svix, signing_secret }: PrivyWebhooksService.VerifyInput): Promise<unknown> {
    const signingSecret = signing_secret ?? this.webhookSigningSecret;
    if (!signingSecret) {
      throw new InvalidWebhookError('Webhook signing secret is required');
    }

    try {
      const webhook = new Webhook(signingSecret);
      const stringPayload = JSON.stringify(payload);
      const svixHeaders = {
        'svix-id': svix.id,
        'svix-timestamp': svix.timestamp,
        'svix-signature': svix.signature,
      };
      return webhook.verify(stringPayload, svixHeaders);
    } catch (error) {
      if (error instanceof Error) {
        throw new InvalidWebhookError(`Webhook verification failed: ${error.message}`);
      } else {
        throw new InvalidWebhookError('Webhook verification failed');
      }
    }
  }
}

// prettier-ignore
/**
 * The namespace for types related to the Webhooks service class.
 * @see {@link PrivyWebhooksService} class.
 */
export namespace PrivyWebhooksService {
  /** The input type for the {@link PrivyWebhooksService.verify} method. */
  export type VerifyInput = {
    payload: Object,
    svix: {
      id: string,
      timestamp: string,
      signature: string,
    }
    signing_secret?: string,
  };
}

export class InvalidWebhookError extends PrivyAPIError {}
