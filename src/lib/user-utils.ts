import type { User } from '../resources/users';

export type LinkedAccount = User['linked_accounts'][number];

// prettier-ignore
export type ExternalWalletLinkedAccount = Exclude<
  Extract<LinkedAccount, { type: 'wallet' }>,
  EmbeddedWalletLinkedAccount
>;

/**
 * An embedded wallet linked account is a wallet owned by the user that can be used with the Privy API.
 */
export type EmbeddedWalletLinkedAccount = Extract<
  LinkedAccount,
  { type: 'wallet'; wallet_client_type: 'privy'; connector_type: 'embedded' }
>;

/**
 * Determines if a given linked account is an embedded wallet account.
 * Embedded wallet accounts are wallets that can be used with the Privy API.
 *
 * @param account a linked account
 * @returns whether the account is an embedded wallet account
 */
export const isEmbeddedWalletLinkedAccount = (
  account: User['linked_accounts'][number],
): account is EmbeddedWalletLinkedAccount =>
  account.type === 'wallet' &&
  account.wallet_client_type === 'privy' &&
  account.connector_type === 'embedded';
