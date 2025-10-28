import type { LinkedAccount, LinkedAccountEmbeddedWallet } from '../resources/users';

// prettier-ignore
export type ExternalWalletLinkedAccount = Exclude<
  Extract<LinkedAccount, { type: 'wallet' }>,
  LinkedAccountEmbeddedWallet
>;

/**
 * An embedded wallet linked account is a wallet owned by the user that can be used with the Privy API.
 * @deprecated Use `LinkedAccountEmbeddedWallet` instead.
 */
export type EmbeddedWalletLinkedAccount = LinkedAccountEmbeddedWallet;

/**
 * Determines if a given linked account is an embedded wallet account.
 * Embedded wallet accounts are wallets that can be used with the Privy API.
 *
 * @param account a linked account
 * @returns whether the account is an embedded wallet account
 */
export const isEmbeddedWalletLinkedAccount = (
  account: LinkedAccount,
): account is LinkedAccountEmbeddedWallet =>
  account.type === 'wallet' &&
  account.wallet_client_type === 'privy' &&
  account.connector_type === 'embedded';
