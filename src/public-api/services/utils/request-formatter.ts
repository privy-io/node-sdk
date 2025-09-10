import { formatRequestForAuthorizationSignature } from '../../../lib/authorization';

export class PrivyRequestFormatter {
  // Expose these as methods here for convenience
  public formatRequestForAuthorizationSignature = formatRequestForAuthorizationSignature;
}
