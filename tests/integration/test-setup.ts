import { AuthorizationContext, P256KeyPair, PrivyClient, generateP256KeyPair } from '@privy-io/node';
import { generateTestJWT } from '../helpers/jwt-auth';
import { TEST_APP } from './test-config';

export interface TestWalletResources {
  client: PrivyClient;
  p256KeyPair: P256KeyPair;
  quorumKeyPair: P256KeyPair;
  userId: string;
  customUserId: string;
  quorumId: string;
}

export interface TestWallet {
  ownership: string;
  id: string;
  address: string;
  publicKey?: string | undefined;
  authorizationContext?: AuthorizationContext | undefined;
}

/**
 * Static list of wallet ownership cases for use with describe.each / it.each.
 * Matches the order and ownership values returned by createTestWallets.
 *
 * This needs to have an `index` property so jest .each can know it.
 */
export const WALLET_CASES = [
  { index: 0, ownership: 'ownerless' },
  { index: 1, ownership: 'key-owned' },
  { index: 2, ownership: 'user-owned' },
  { index: 3, ownership: 'quorum-owned' },
] as const;

export async function setupTestWalletResources(): Promise<TestWalletResources> {
  const client = new PrivyClient({
    appId: TEST_APP.id,
    appSecret: TEST_APP.secret,
    apiUrl: TEST_APP.apiUrl,
  });

  const [p256KeyPair, quorumKeyPair] = await Promise.all([generateP256KeyPair(), generateP256KeyPair()]);

  const customUserId = `test-user-${Date.now()}`;
  const user = await client.users().create({
    linked_accounts: [{ type: 'custom_auth', custom_user_id: customUserId }],
  });

  const quorum = await client.keyQuorums().create({
    public_keys: [quorumKeyPair.publicKey],
    user_ids: [user.id],
    display_name: 'NodeSDK Test Quorum',
    authorization_threshold: 1,
  });

  return {
    client,
    p256KeyPair,
    quorumKeyPair,
    userId: user.id,
    customUserId,
    quorumId: quorum.id,
  };
}

export async function cleanupTestWalletResources(resources: TestWalletResources) {
  try {
    await resources.client.keyQuorums().delete(resources.quorumId, {
      authorization_context: { authorization_private_keys: [resources.quorumKeyPair.privateKey] },
    });
  } catch {
    // Best-effort cleanup
  }
  try {
    await resources.client.users().delete(resources.userId);
  } catch {
    // Best-effort cleanup
  }
}

export async function createTestWallets(
  resources: TestWalletResources,
  chainType: 'ethereum' | 'solana' | 'tron',
): Promise<TestWallet[]> {
  const { client, p256KeyPair, quorumKeyPair, userId, customUserId, quorumId } = resources;

  const userJwt = await generateTestJWT(customUserId);
  const quorumJwt = await generateTestJWT(customUserId);

  const testWallets = await Promise.all(
    WALLET_CASES.map(async ({ ownership }) => {
      let owner;
      let ownerId;
      let authorizationContext: AuthorizationContext | undefined;

      switch (ownership) {
        case 'ownerless':
          break;
        case 'key-owned':
          owner = { public_key: p256KeyPair.publicKey };
          authorizationContext = { authorization_private_keys: [p256KeyPair.privateKey] };
          break;
        case 'user-owned':
          owner = { user_id: userId };
          authorizationContext = { user_jwts: [userJwt] };
          break;
        case 'quorum-owned':
          ownerId = quorumId;
          authorizationContext = {
            authorization_private_keys: [quorumKeyPair.privateKey],
            user_jwts: [quorumJwt],
          };
          break;
      }

      const wallet = await client.wallets().create({ chain_type: chainType, owner, owner_id: ownerId });

      return {
        ownership,
        id: wallet.id,
        address: wallet.address,
        publicKey: wallet.public_key,
        authorizationContext,
      };
    }),
  );

  return testWallets;
}
