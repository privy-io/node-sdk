import { JWTPayload } from 'jose';
import { User } from '../resources';
import { PrivyAPIError } from '../error';
import { EmbeddedWalletLinkedAccount, ExternalWalletLinkedAccount } from './user-utils';

/**
 * Parses the payload of an identity token (JWT) into a `User` object.
 * Note that the user object may be incomplete due to the size constraints of the identity token.
 *
 * @param payload The payload of the identity token.
 * @returns The user object parsed from the identity token.
 * @throws If the payload is invalid.
 */
export function parseUserFromIdentityTokenPayload(payload: JWTPayload): User {
  const customMetadata = parseCustomMetadataClaim(payload);

  return {
    id: payload.sub as string,
    created_at: parseInt(payload['cr'] as string),
    is_guest: payload['guest'] === 't',
    linked_accounts: parseLinkedAccountsClaim(payload),
    ...(customMetadata ? { custom_metadata: customMetadata } : {}),
    has_accepted_terms: false,
    mfa_methods: [],
  };
}

function parseLinkedAccountsClaim(payload: JWTPayload): User['linked_accounts'] {
  const linkedAccountsClaim = payload['linked_accounts'];
  if (typeof linkedAccountsClaim !== 'string') {
    throw new InvalidIdentityTokenError('Unable to parse identity token');
  }
  const parsedLinkedAccounts = JSON.parse(linkedAccountsClaim) as unknown;
  if (!Array.isArray(parsedLinkedAccounts)) {
    throw new InvalidIdentityTokenError('Unable to parse identity token');
  }

  return parsedLinkedAccounts
    .map(mapIdLinkedAccountToUserLinkedAccount)
    .filter((account) => account !== null);
}

function mapIdLinkedAccountToUserLinkedAccount(account: any): User['linked_accounts'][number] | null {
  if (account.type === 'email') {
    return {
      type: 'email',
      address: account.address,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountEmail;
  }
  if (account.type === 'phone') {
    return {
      type: 'phone',
      phoneNumber: account.phone_number,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountPhone;
  }

  // Parses all wallet types
  if (account.type === 'wallet') {
    if (account.wallet_client_type === 'privy') {
      return {
        type: 'wallet',
        wallet_client_type: 'privy',
        wallet_client: 'privy',
        connector_type: 'embedded',
        id: account.id,
        address: account.address,
        chain_type: account.chain_type,
        first_verified_at: null,
        verified_at: account.lv,
        latest_verified_at: account.lv,
        // The following fields are not present in the identity token,
        // but are required. We set them to some safe defaults.
        chain_id: '',
        delegated: false,
        imported: false,
        public_key: '',
        wallet_index: 0,
        recovery_method: account.id ? 'privy-v2' : 'privy',
      } satisfies EmbeddedWalletLinkedAccount;
    }
    return {
      type: 'wallet',
      wallet_client: 'unknown',
      address: account.address,
      chain_type: account.chain_type,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies ExternalWalletLinkedAccount;
  }
  if (account.type === 'smart_wallet') {
    return {
      type: 'smart_wallet',
      address: account.address,
      smart_wallet_type: account.smart_wallet_type,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountSmartWallet;
  }
  if (account.type === 'farcaster') {
    return {
      type: 'farcaster',
      fid: account.fid,
      username: account.username,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
      owner_address: account.oa,
    } satisfies User.LinkedAccountFarcaster;
  }
  if (account.type === 'google_oauth') {
    return {
      type: 'google_oauth',
      subject: account.subject,
      email: account.email,
      name: account.name,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountGoogleOAuth;
  }
  if (account.type === 'twitter_oauth') {
    // We send along three potential URL shapes here based on possible profile picture URLs, all
    // done to preserve size.
    //   1. pfp begins with `default`, in which case we use the default profile picture URL structure
    //   2. pfp does not start with https, in which case we assume the profile picture URL structure
    //   3. Otherwise, we use the pfp URL as-is
    let pfp = account.pfp ? account.pfp : null;
    if (pfp?.startsWith('default')) {
      pfp = `https://abs.twimg.com/sticky/default_profile_images/${pfp}`;
    } else if (!pfp?.startsWith('https://')) {
      pfp = `https://pbs.twimg.com/profile_images/${pfp}`;
    }

    return {
      type: 'twitter_oauth',
      subject: account.subject,
      username: account.username,
      name: account.name ? account.name : null,
      profile_picture_url: pfp,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountTwitterOAuth;
  }
  if (account.type === 'discord_oauth') {
    return {
      type: 'discord_oauth',
      subject: account.subject,
      username: account.username,
      email: null, // not a part of the identity token
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountDiscordOAuth;
  }
  if (account.type === 'github_oauth') {
    return {
      type: 'github_oauth',
      subject: account.subject,
      username: account.username,
      email: null, // not a part of the identity token
      name: null, // not a part of the identity token
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountGitHubOAuth;
  }
  if (account.type === 'spotify_oauth') {
    return {
      type: 'spotify_oauth',
      subject: account.subject,
      email: null, // not a part of the identity token
      name: null, // not a part of the identity token
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountSpotifyOAuth;
  }
  if (account.type === 'instagram_oauth') {
    return {
      type: 'instagram_oauth',
      subject: account.subject,
      username: account.username,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountInstagramOAuth;
  }
  if (account.type === 'tiktok_oauth') {
    return {
      type: 'tiktok_oauth',
      subject: account.subject,
      username: account.username,
      name: null, // not a part of the identity token
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountTiktokOAuth;
  }
  if (account.type === 'linkedin_oauth') {
    return {
      type: 'linkedin_oauth',
      subject: account.subject,
      email: account.email,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountLinkedInOAuth;
  }
  if (account.type === 'apple_oauth') {
    return {
      type: 'apple_oauth',
      subject: account.subject,
      email: account.email,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountAppleOAuth;
  }
  if (account.type === 'cross_app') {
    return {
      type: 'cross_app',
      subject: account.subject,
      provider_app_id: account.provider_app_id,
      embedded_wallets: account.embedded_wallets,
      smart_wallets: account.smart_wallets,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountCrossApp;
  }
  if (account.type === 'custom_auth') {
    return {
      type: 'custom_auth',
      custom_user_id: account.custom_user_id,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountCustomJwt;
  }

  if (account.type === 'telegram') {
    return {
      type: 'telegram',
      telegram_user_id: account.telegram_user_id,
      username: account.username,
      first_verified_at: null,
      verified_at: account.lv,
      latest_verified_at: account.lv,
    } satisfies User.LinkedAccountTelegram;
  }

  return null;
}

function parseCustomMetadataClaim(payload: JWTPayload): User['custom_metadata'] {
  const customMetadataClaim = payload['custom_metadata'];
  if (customMetadataClaim === undefined) {
    return undefined;
  }
  if (typeof customMetadataClaim !== 'string') {
    throw new InvalidIdentityTokenError('Unable to parse identity token');
  }
  const parsedCustomMetadata = JSON.parse(customMetadataClaim) as unknown;
  if (!parsedCustomMetadata || typeof parsedCustomMetadata !== 'object') {
    throw new InvalidIdentityTokenError('Unable to parse identity token');
  }

  return parsedCustomMetadata as User['custom_metadata'];
}

export class InvalidIdentityTokenError extends PrivyAPIError {}
