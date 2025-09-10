import { generateAuthorizationSignature, generateAuthorizationSignatures } from '../../../lib/authorization';
import { PrivyClient } from '../../PrivyClient';

export class PrivyRequestSigner {
  private privyClient: PrivyClient;

  constructor(privyClient: PrivyClient) {
    this.privyClient = privyClient;
  }

  // Expose these as methods here for convenience
  public generateAuthorizationSignature = generateAuthorizationSignature;
  public generateAuthorizationSignatures(...input: PrivyRequestSigner.GenerateAuthorizationSignaturesInput) {
    // Pre-populates the client instance for the function
    return generateAuthorizationSignatures(this.privyClient, ...input);
  }
}

// prettier-ignore
export namespace PrivyRequestSigner {
  export type GenerateAuthorizationSignaturesInput = ParametersExceptFirst<typeof generateAuthorizationSignatures>;
}

/**
 * Utility type similar to `Parameters` but excluding the first argument.
 * This is used to get the types of the remaining arguments of a function, excluding the first one.
 *
 * @example
 * ```ts
 * type MyFunction = (arg0: string, arg1: number, arg2: boolean) => any;
 * type MyFunctionParameters = ParametersExceptFirst<MyFunction>;
 * // type MyFunctionParameters = [number, boolean]
 * ```
 */
type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any ? R : never;
