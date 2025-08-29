import canonicalize from 'canonicalize';
import { PrivyAPIError } from '../../../core/error';
import { WalletApiRequestSignatureInput } from '../../../lib/authorization';

export class PrivyRequestFormatter {
  /**
   * Formats the request payload into the expected authorization payload, canconicalizes it,
   * and encodes the JSON string into bytes.
   *
   * @param request The request to be formatted.
   * @return The raw bytes representing the authorization payload.
   */
  public formatRequestForAuthorizationSignature(input: WalletApiRequestSignatureInput): Uint8Array {
    const serializedInput = canonicalize(input);
    if (!serializedInput) {
      throw new PrivyAPIError('Failed to serialize request for authorization signature');
    }
    return new TextEncoder().encode(serializedInput);
  }
}
