import { PrivyAPI } from '../../client';
import type {
  AllowlistEntry,
  AllowlistDeletionResponse,
  AppResponse,
  UserInviteInput,
} from '../../resources/apps/apps';
import type { AllowlistListResponse } from '../../resources/apps/allowlist';
import { Apps } from '../../resources/apps/apps';
import { AuthenticatedUser } from '../../resources';

export class PrivyAppsService extends Apps {
  constructor(privyApiClient: PrivyAPI) {
    super(privyApiClient);
  }

  async getAllowlist(): Promise<AllowlistListResponse> {
    return this.allowlist.list(this._client.appID);
  }

  async inviteToAllowlist(entry: UserInviteInput): Promise<AllowlistEntry> {
    return this.allowlist.create(this._client.appID, entry);
  }

  async removeFromAllowlist(entry: UserInviteInput): Promise<AllowlistDeletionResponse> {
    return this.allowlist.delete(this._client.appID, entry);
  }

  async getSettings(): Promise<AppResponse> {
    return this.get(this._client.appID);
  }

  async getTestAccessToken(
    params?: PrivyAppsService.GetTestAccessTokenParams,
  ): Promise<PrivyAppsService.TestAccessTokenResponse> {
    const { data: testAccounts } = await this.getTestCredentials(this._client.appID);

    if (!testAccounts || testAccounts.length === 0) {
      throw new Error('No test accounts found for this app. Create test accounts in the Privy dashboard.');
    }

    let account;
    if (params && 'email' in params) {
      account = testAccounts.find((a) => a.email === params.email);
      if (!account) {
        throw new Error(
          `No test account found with email "${params.email}". Available: ${testAccounts
            .map((a) => a.email)
            .join(', ')}`,
        );
      }
    } else if (params && 'phone_number' in params) {
      account = testAccounts.find((a) => a.phone_number === params.phone_number);
      if (!account) {
        throw new Error(
          `No test account found with phone number "${params.phone_number}". Available: ${testAccounts
            .map((a) => a.phone_number)
            .join(', ')}`,
        );
      }
    } else {
      account = testAccounts[0]!;
    }

    const authResponse = await this._client.post<AuthenticatedUser>('/v1/passwordless/authenticate', {
      body: { email: account.email, code: account.otp_code },
    });

    if (!authResponse.token) {
      throw new Error('Unable to authenticate with the test account.');
    }

    return { access_token: authResponse.token };
  }
}

export namespace PrivyAppsService {
  export type GetTestAccessTokenParams =
    | { email: string; phone_number?: never }
    | { phone_number: string; email?: never };

  export interface TestAccessTokenResponse {
    access_token: string;
  }
}
