// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.wallets.create',
    fullyQualifiedName: 'wallets.create',
    httpMethod: 'post',
    httpPath: '/v1/wallets',
  },
  {
    clientCallName: 'client.wallets.list',
    fullyQualifiedName: 'wallets.list',
    httpMethod: 'get',
    httpPath: '/v1/wallets',
  },
  {
    clientCallName: 'client.wallets._export',
    fullyQualifiedName: 'wallets._export',
    httpMethod: 'post',
    httpPath: '/v1/wallets/{wallet_id}/export',
  },
  {
    clientCallName: 'client.wallets._initImport',
    fullyQualifiedName: 'wallets._initImport',
    httpMethod: 'post',
    httpPath: '/v1/wallets/import/init',
  },
  {
    clientCallName: 'client.wallets._rawSign',
    fullyQualifiedName: 'wallets._rawSign',
    httpMethod: 'post',
    httpPath: '/v1/wallets/{wallet_id}/raw_sign',
  },
  {
    clientCallName: 'client.wallets._rpc',
    fullyQualifiedName: 'wallets._rpc',
    httpMethod: 'post',
    httpPath: '/v1/wallets/{wallet_id}/rpc',
  },
  {
    clientCallName: 'client.wallets._submitImport',
    fullyQualifiedName: 'wallets._submitImport',
    httpMethod: 'post',
    httpPath: '/v1/wallets/import/submit',
  },
  {
    clientCallName: 'client.wallets._update',
    fullyQualifiedName: 'wallets._update',
    httpMethod: 'patch',
    httpPath: '/v1/wallets/{wallet_id}',
  },
  {
    clientCallName: 'client.wallets.authenticateWithJwt',
    fullyQualifiedName: 'wallets.authenticateWithJwt',
    httpMethod: 'post',
    httpPath: '/v1/wallets/authenticate',
  },
  {
    clientCallName: 'client.wallets.createWalletsWithRecovery',
    fullyQualifiedName: 'wallets.createWalletsWithRecovery',
    httpMethod: 'post',
    httpPath: '/v1/wallets_with_recovery',
  },
  {
    clientCallName: 'client.wallets.get',
    fullyQualifiedName: 'wallets.get',
    httpMethod: 'get',
    httpPath: '/v1/wallets/{wallet_id}',
  },
  {
    clientCallName: 'client.wallets.transactions.get',
    fullyQualifiedName: 'wallets.transactions.get',
    httpMethod: 'get',
    httpPath: '/v1/wallets/{wallet_id}/transactions',
  },
  {
    clientCallName: 'client.wallets.balance.get',
    fullyQualifiedName: 'wallets.balance.get',
    httpMethod: 'get',
    httpPath: '/v1/wallets/{wallet_id}/balance',
  },
  {
    clientCallName: 'client.users.create',
    fullyQualifiedName: 'users.create',
    httpMethod: 'post',
    httpPath: '/v1/users',
  },
  {
    clientCallName: 'client.users.list',
    fullyQualifiedName: 'users.list',
    httpMethod: 'get',
    httpPath: '/v1/users',
  },
  {
    clientCallName: 'client.users.delete',
    fullyQualifiedName: 'users.delete',
    httpMethod: 'delete',
    httpPath: '/v1/users/{user_id}',
  },
  {
    clientCallName: 'client.users._get',
    fullyQualifiedName: 'users._get',
    httpMethod: 'get',
    httpPath: '/v1/users/{user_id}',
  },
  {
    clientCallName: 'client.users.getByCustomAuthID',
    fullyQualifiedName: 'users.getByCustomAuthID',
    httpMethod: 'post',
    httpPath: '/v1/users/custom_auth/id',
  },
  {
    clientCallName: 'client.users.getByDiscordUsername',
    fullyQualifiedName: 'users.getByDiscordUsername',
    httpMethod: 'post',
    httpPath: '/v1/users/discord/username',
  },
  {
    clientCallName: 'client.users.getByEmailAddress',
    fullyQualifiedName: 'users.getByEmailAddress',
    httpMethod: 'post',
    httpPath: '/v1/users/email/address',
  },
  {
    clientCallName: 'client.users.getByFarcasterID',
    fullyQualifiedName: 'users.getByFarcasterID',
    httpMethod: 'post',
    httpPath: '/v1/users/farcaster/fid',
  },
  {
    clientCallName: 'client.users.getByGitHubUsername',
    fullyQualifiedName: 'users.getByGitHubUsername',
    httpMethod: 'post',
    httpPath: '/v1/users/github/username',
  },
  {
    clientCallName: 'client.users.getByPhoneNumber',
    fullyQualifiedName: 'users.getByPhoneNumber',
    httpMethod: 'post',
    httpPath: '/v1/users/phone/number',
  },
  {
    clientCallName: 'client.users.getBySmartWalletAddress',
    fullyQualifiedName: 'users.getBySmartWalletAddress',
    httpMethod: 'post',
    httpPath: '/v1/users/smart_wallet/address',
  },
  {
    clientCallName: 'client.users.getByTelegramUserID',
    fullyQualifiedName: 'users.getByTelegramUserID',
    httpMethod: 'post',
    httpPath: '/v1/users/telegram/telegram_user_id',
  },
  {
    clientCallName: 'client.users.getByTelegramUsername',
    fullyQualifiedName: 'users.getByTelegramUsername',
    httpMethod: 'post',
    httpPath: '/v1/users/telegram/username',
  },
  {
    clientCallName: 'client.users.getByTwitterSubject',
    fullyQualifiedName: 'users.getByTwitterSubject',
    httpMethod: 'post',
    httpPath: '/v1/users/twitter/subject',
  },
  {
    clientCallName: 'client.users.getByTwitterUsername',
    fullyQualifiedName: 'users.getByTwitterUsername',
    httpMethod: 'post',
    httpPath: '/v1/users/twitter/username',
  },
  {
    clientCallName: 'client.users.getByWalletAddress',
    fullyQualifiedName: 'users.getByWalletAddress',
    httpMethod: 'post',
    httpPath: '/v1/users/wallet/address',
  },
  {
    clientCallName: 'client.users.pregenerateWallets',
    fullyQualifiedName: 'users.pregenerateWallets',
    httpMethod: 'post',
    httpPath: '/v1/users/{user_id}/wallets',
  },
  {
    clientCallName: 'client.users.search',
    fullyQualifiedName: 'users.search',
    httpMethod: 'post',
    httpPath: '/v1/users/search',
  },
  {
    clientCallName: 'client.users.setCustomMetadata',
    fullyQualifiedName: 'users.setCustomMetadata',
    httpMethod: 'post',
    httpPath: '/v1/users/{user_id}/custom_metadata',
  },
  {
    clientCallName: 'client.users.unlinkLinkedAccount',
    fullyQualifiedName: 'users.unlinkLinkedAccount',
    httpMethod: 'post',
    httpPath: '/v1/users/{user_id}/accounts/unlink',
  },
  {
    clientCallName: 'client.policies.create',
    fullyQualifiedName: 'policies.create',
    httpMethod: 'post',
    httpPath: '/v1/policies',
  },
  {
    clientCallName: 'client.policies._createRule',
    fullyQualifiedName: 'policies._createRule',
    httpMethod: 'post',
    httpPath: '/v1/policies/{policy_id}/rules',
  },
  {
    clientCallName: 'client.policies._delete',
    fullyQualifiedName: 'policies._delete',
    httpMethod: 'delete',
    httpPath: '/v1/policies/{policy_id}',
  },
  {
    clientCallName: 'client.policies._deleteRule',
    fullyQualifiedName: 'policies._deleteRule',
    httpMethod: 'delete',
    httpPath: '/v1/policies/{policy_id}/rules/{rule_id}',
  },
  {
    clientCallName: 'client.policies._update',
    fullyQualifiedName: 'policies._update',
    httpMethod: 'patch',
    httpPath: '/v1/policies/{policy_id}',
  },
  {
    clientCallName: 'client.policies._updateRule',
    fullyQualifiedName: 'policies._updateRule',
    httpMethod: 'patch',
    httpPath: '/v1/policies/{policy_id}/rules/{rule_id}',
  },
  {
    clientCallName: 'client.policies.get',
    fullyQualifiedName: 'policies.get',
    httpMethod: 'get',
    httpPath: '/v1/policies/{policy_id}',
  },
  {
    clientCallName: 'client.policies.getRule',
    fullyQualifiedName: 'policies.getRule',
    httpMethod: 'get',
    httpPath: '/v1/policies/{policy_id}/rules/{rule_id}',
  },
  {
    clientCallName: 'client.transactions.get',
    fullyQualifiedName: 'transactions.get',
    httpMethod: 'get',
    httpPath: '/v1/transactions/{transaction_id}',
  },
  {
    clientCallName: 'client.keyQuorums.create',
    fullyQualifiedName: 'keyQuorums.create',
    httpMethod: 'post',
    httpPath: '/v1/key_quorums',
  },
  {
    clientCallName: 'client.keyQuorums._delete',
    fullyQualifiedName: 'keyQuorums._delete',
    httpMethod: 'delete',
    httpPath: '/v1/key_quorums/{key_quorum_id}',
  },
  {
    clientCallName: 'client.keyQuorums._update',
    fullyQualifiedName: 'keyQuorums._update',
    httpMethod: 'patch',
    httpPath: '/v1/key_quorums/{key_quorum_id}',
  },
  {
    clientCallName: 'client.keyQuorums.get',
    fullyQualifiedName: 'keyQuorums.get',
    httpMethod: 'get',
    httpPath: '/v1/key_quorums/{key_quorum_id}',
  },
  {
    clientCallName: 'client.apps.get',
    fullyQualifiedName: 'apps.get',
    httpMethod: 'get',
    httpPath: '/v1/apps/{app_id}',
  },
  {
    clientCallName: 'client.apps.allowlist.create',
    fullyQualifiedName: 'apps.allowlist.create',
    httpMethod: 'post',
    httpPath: '/v1/apps/{app_id}/allowlist',
  },
  {
    clientCallName: 'client.apps.allowlist.list',
    fullyQualifiedName: 'apps.allowlist.list',
    httpMethod: 'get',
    httpPath: '/v1/apps/{app_id}/allowlist',
  },
  {
    clientCallName: 'client.apps.allowlist.delete',
    fullyQualifiedName: 'apps.allowlist.delete',
    httpMethod: 'delete',
    httpPath: '/v1/apps/{app_id}/allowlist',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
