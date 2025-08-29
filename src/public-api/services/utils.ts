import {
  formatRequestForAuthorizationSignature,
  generateAuthorizationSignature,
  generateAuthorizationSignatures,
} from '../../lib/authorization';

export class PrivyUtils {
  // Expose these as methods here for convenience
  public formatRequestForAuthorizationSignature = formatRequestForAuthorizationSignature;
  public generateAuthorizationSignature = generateAuthorizationSignature;
  public generateAuthorizationSignatures = generateAuthorizationSignatures;
}
