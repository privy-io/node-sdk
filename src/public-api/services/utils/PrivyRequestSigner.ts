import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import { AuthorizationContext, WalletApiRequestSignatureInput } from '../../../lib/authorization';
import { importPKCS8PrivateKey } from '../../../lib/cryptography';
import { PrivyRequestFormatter } from './PrivyRequestFormatter';

export class PrivyRequestSigner {
  private requestFormatter: PrivyRequestFormatter;

  constructor(requestFormatter: PrivyRequestFormatter) {
    this.requestFormatter = requestFormatter;
  }

  /**
   * Generates authorization signatures from the given authorization context and signable request.
   * This method handles JWT exchange and private key signing.
   *
   * Manual signing of requests is intended for advanced use cases.
   *
   * @param authorizationContext The authorization context containing JWTs, private keys, and signatures.
   * @param input The request payload to sign.
   * @returns An array of authorization signatures.
   */
  public generateAuthorizationSignatures({
    authorizationContext,
    input,
  }: {
    authorizationContext: AuthorizationContext;
    input: WalletApiRequestSignatureInput;
  }): string[] {
    const payload = this.requestFormatter.formatRequestForAuthorizationSignature(input);

    // TODO: add support for user JWTs
    // TODO: add support for passed in signatures
    const privateKeys = authorizationContext.authorizationPrivateKeys ?? [];

    return privateKeys.map((sk) =>
      this.generateAuthorizationSignature({ authorizationPrivateKey: sk, input: payload }),
    );
  }

  /**
   * Signs the given request with the provided private key.
   *
   * @param authorizationPrivateKey The base64-encoded PKCS8-formatted private key, with no PEM headers.
   * @param input The request payload to sign, or one serialized using {@link formatRequestForAuthorizationSignature}.
   * @return The authorization signature.
   */
  public generateAuthorizationSignature({
    authorizationPrivateKey,
    input,
  }: {
    authorizationPrivateKey: string;
    input: WalletApiRequestSignatureInput | Uint8Array;
  }): string {
    const payload =
      input instanceof Uint8Array ? input : (
        this.requestFormatter.formatRequestForAuthorizationSignature(input)
      );
    const privateKey = importPKCS8PrivateKey(authorizationPrivateKey);

    const signature = p256.sign(sha256(payload), privateKey).toBytes('der');
    // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
    return Buffer.from(signature).toString('base64');
  }
}
