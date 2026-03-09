import { PrivyAPI } from '../../client';
import type {
  AllowlistEntry,
  AllowlistDeletionResponse,
  AppResponse,
  UserInviteInput,
} from '../../resources/apps/apps';
import type { AllowlistListResponse } from '../../resources/apps/allowlist';
import { Apps } from '../../resources/apps/apps';

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
}
