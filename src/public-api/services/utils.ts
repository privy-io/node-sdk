import {
  formatRequestForAuthorizationSignature,
  generateAuthorizationSignature,
  generateAuthorizationSignatures,
} from '../../lib/authorization';
import { PrivyClient } from '../PrivyClient';

export class PrivyUtils {
  private privyClient: PrivyClient;

  constructor(privyClient: PrivyClient) {
    this.privyClient = privyClient;
  }

  // Expose these as methods here for convenience
  public formatRequestForAuthorizationSignature = formatRequestForAuthorizationSignature;
  public generateAuthorizationSignature = generateAuthorizationSignature;
  public get generateAuthorizationSignatures() {
    // Pre-populates the client instance for the function
    return generateAuthorizationSignatures.bind(null, this.privyClient);
  }
}
