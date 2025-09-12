import { PrivyAPI } from '../../client';
import { PrivyAppJWKS, verifyIdentityToken } from '../../lib/auth';
import { User, Users } from '../../resources';

export class PrivyUsersService extends Users {
  private appJwks: PrivyAppJWKS;
  constructor(privyApiClient: PrivyAPI, appJwks: PrivyAppJWKS) {
    super(privyApiClient);
    this.appJwks = appJwks;
  }

  /**
   * Gets a user object from the identity token.
   * This verifies the token and parses the payload into a `User` object.
   * Note the user object may be incomplete due to the size constraints of the identity token.
   *
   * @param input.id_token the identity token to parse.
   * @returns the user object parsed from the identity token.
   *
   * @example
   * const idToken = req.cookies.get('privy-id-token'); // or however your framework surfaces cookies
   * const user = await client.users().get({idToken});
   */
  public async get({ id_token }: PrivyUsersService.GetInput): Promise<User> {
    return verifyIdentityToken({
      identity_token: id_token,
      app_id: this._client.appID,
      verification_key: this.appJwks,
    });
  }
}

export namespace PrivyUsersService {
  export type GetInput = {
    id_token: string;
  };
}
