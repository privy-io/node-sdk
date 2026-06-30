// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntentsAPI from './intents';
import * as UsersAPI from './users';
import * as AppsAPI from './apps/apps';
import * as ActionsAPI from './wallets/actions';
import * as WalletsAPI from './wallets/wallets';

export class Webhooks extends APIResource {
  unsafeUnwrap(body: string): UnsafeUnwrapWebhookEvent {
    return JSON.parse(body) as UnsafeUnwrapWebhookEvent;
  }
}

/**
 * Block metadata for a wallet transfer event.
 */
export interface BlockInfo {
  /**
   * The block number.
   */
  number: number;

  /**
   * The block timestamp.
   */
  timestamp: number;
}

/**
 * Bridge metadata for a crypto deposit via liquidation address.
 */
export interface BridgeCryptoDepositMetadata {
  drain_id: string;

  /**
   * The crypto address of the liquidation address that received the deposit.
   */
  liquidation_address: string;

  liquidation_address_id: string;

  method: 'liquidation_address';

  /**
   * The address that sent the deposit.
   */
  source_wallet_address: string;

  type: 'crypto_deposit';
}

/**
 * Bridge metadata for a crypto deposit via transfer.
 */
export interface BridgeCryptoTransferMetadata {
  method: 'transfer';

  /**
   * The wallet address that sent the transfer.
   */
  source_wallet_address: string;

  transfer_id: string;

  type: 'crypto_deposit';
}

/**
 * Bridge metadata for a fiat deposit via virtual account.
 */
export interface BridgeFiatDepositMetadata {
  activity_id: string;

  method: 'virtual_account';

  type: 'fiat_deposit';

  virtual_account_id: string;
}

/**
 * Bridge metadata for a fiat deposit via transfer.
 */
export interface BridgeFiatTransferMetadata {
  method: 'transfer';

  transfer_id: string;

  type: 'fiat_deposit';
}

/**
 * Metadata about a Bridge transaction associated with a wallet event.
 */
export type BridgeMetadata =
  | BridgeCryptoDepositMetadata
  | BridgeRefundMetadata
  | BridgeFiatDepositMetadata
  | BridgeCryptoTransferMetadata
  | BridgeFiatTransferMetadata
  | BridgeTransferRefundMetadata
  | BridgeStaticMemoDepositMetadata;

/**
 * Bridge metadata for a refund via liquidation address.
 */
export interface BridgeRefundMetadata {
  drain_id: string;

  liquidation_address_id: string;

  method: 'liquidation_address';

  /**
   * The original deposit transaction hash that triggered the failed drain.
   */
  original_transaction_hash: string;

  type: 'refund';
}

/**
 * Bridge metadata for a fiat deposit via static memo.
 */
export interface BridgeStaticMemoDepositMetadata {
  method: 'static_memo';

  static_memo_event_id: string;

  static_memo_id: string;

  type: 'fiat_deposit';
}

/**
 * Bridge metadata for a transfer refund.
 */
export interface BridgeTransferRefundMetadata {
  method: 'transfer';

  transfer_id: string;

  type: 'refund';

  /**
   * The original transfer transaction hash (if available).
   */
  original_transaction_hash?: string;
}

/**
 * Payload for the wallet.funds_deposited webhook event.
 */
export interface FundsDepositedWebhookPayload {
  /**
   * The amount transferred, as a stringified bigint.
   */
  amount: string;

  /**
   * An asset involved in a wallet transfer.
   */
  asset: WalletFundsAsset;

  /**
   * Block metadata for a wallet transfer event.
   */
  block: BlockInfo;

  /**
   * The CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * A unique key for this event.
   */
  idempotency_key: string;

  /**
   * The recipient address.
   */
  recipient: string;

  /**
   * The sender address.
   */
  sender: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The type of webhook event.
   */
  type: 'wallet.funds_deposited';

  /**
   * The ID of the wallet.
   */
  wallet_id: string;

  /**
   * Metadata about a Bridge transaction associated with a wallet event.
   */
  bridge_metadata?: BridgeMetadata;

  /**
   * The transaction fee paid, as a stringified bigint in the chain's native token.
   */
  transaction_fee?: string;
}

/**
 * Payload for the wallet.funds_withdrawn webhook event.
 */
export interface FundsWithdrawnWebhookPayload {
  /**
   * The amount transferred, as a stringified bigint.
   */
  amount: string;

  /**
   * An asset involved in a wallet transfer.
   */
  asset: WalletFundsAsset;

  /**
   * Block metadata for a wallet transfer event.
   */
  block: BlockInfo;

  /**
   * The CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * A unique key for this event.
   */
  idempotency_key: string;

  /**
   * The recipient address.
   */
  recipient: string;

  /**
   * The sender address.
   */
  sender: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The type of webhook event.
   */
  type: 'wallet.funds_withdrawn';

  /**
   * The ID of the wallet.
   */
  wallet_id: string;

  /**
   * The transaction fee paid, as a stringified bigint in the chain's native token.
   */
  transaction_fee?: string;
}

/**
 * Payload for the intent.authorized webhook event.
 */
export interface IntentAuthorizedWebhookPayload {
  /**
   * Unix timestamp when the authorization was recorded.
   */
  authorized_at: number;

  /**
   * Unix timestamp when the intent was created.
   */
  created_at: number;

  /**
   * Unix timestamp when the intent expires.
   */
  expires_at: number;

  /**
   * The unique ID of the intent.
   */
  intent_id: string;

  /**
   * Type of intent.
   */
  intent_type: IntentsAPI.IntentType;

  /**
   * A leaf member (user or key) of a nested key quorum in an intent authorization.
   */
  member: IntentsAPI.IntentAuthorizationKeyQuorumMember;

  /**
   * The current status of the intent.
   */
  status: string;

  /**
   * The type of webhook event.
   */
  type: 'intent.authorized';

  /**
   * Display name of the user who created the intent.
   */
  created_by_display_name?: string;

  /**
   * The ID of the user who created the intent.
   */
  created_by_id?: string;
}

/**
 * Payload for the intent.created webhook event.
 */
export interface IntentCreatedWebhookPayload {
  /**
   * Unix timestamp when the intent was created.
   */
  created_at: number;

  /**
   * Unix timestamp when the intent expires.
   */
  expires_at: number;

  /**
   * The unique ID of the intent.
   */
  intent_id: string;

  /**
   * Type of intent.
   */
  intent_type: IntentsAPI.IntentType;

  /**
   * The current status of the intent.
   */
  status: string;

  /**
   * The type of webhook event.
   */
  type: 'intent.created';

  /**
   * Key quorums that can authorize this intent.
   */
  authorization_details?: Array<IntentsAPI.IntentAuthorization>;

  /**
   * Display name of the user who created the intent.
   */
  created_by_display_name?: string;

  /**
   * The ID of the user who created the intent.
   */
  created_by_id?: string;
}

/**
 * Payload for the intent.executed webhook event.
 */
export interface IntentExecutedWebhookPayload {
  /**
   * Result of the successful intent execution.
   */
  action_result: IntentsAPI.BaseActionResult;

  /**
   * Unix timestamp when the intent was created.
   */
  created_at: number;

  /**
   * Unix timestamp when the intent expires.
   */
  expires_at: number;

  /**
   * The unique ID of the intent.
   */
  intent_id: string;

  /**
   * Type of intent.
   */
  intent_type: IntentsAPI.IntentType;

  /**
   * The current status of the intent.
   */
  status: string;

  /**
   * The type of webhook event.
   */
  type: 'intent.executed';

  /**
   * Display name of the user who created the intent.
   */
  created_by_display_name?: string;

  /**
   * The ID of the user who created the intent.
   */
  created_by_id?: string;
}

/**
 * Payload for the intent.failed webhook event.
 */
export interface IntentFailedWebhookPayload {
  /**
   * Result of the failed intent execution.
   */
  action_result: IntentsAPI.BaseActionResult;

  /**
   * Unix timestamp when the intent was created.
   */
  created_at: number;

  /**
   * Unix timestamp when the intent expires.
   */
  expires_at: number;

  /**
   * The unique ID of the intent.
   */
  intent_id: string;

  /**
   * Type of intent.
   */
  intent_type: IntentsAPI.IntentType;

  /**
   * The current status of the intent.
   */
  status: string;

  /**
   * The type of webhook event.
   */
  type: 'intent.failed';

  /**
   * Display name of the user who created the intent.
   */
  created_by_display_name?: string;

  /**
   * The ID of the user who created the intent.
   */
  created_by_id?: string;
}

/**
 * Payload for the intent.rejected webhook event.
 */
export interface IntentRejectedWebhookPayload {
  /**
   * Unix timestamp when the intent was created.
   */
  created_at: number;

  /**
   * Unix timestamp when the intent expires.
   */
  expires_at: number;

  /**
   * The unique ID of the intent.
   */
  intent_id: string;

  /**
   * Type of intent.
   */
  intent_type: IntentsAPI.IntentType;

  /**
   * Unix timestamp when the intent was rejected.
   */
  rejected_at: number;

  /**
   * The current status of the intent.
   */
  status: string;

  /**
   * The type of webhook event.
   */
  type: 'intent.rejected';

  /**
   * Display name of the user who created the intent.
   */
  created_by_display_name?: string;

  /**
   * The ID of the user who created the intent.
   */
  created_by_id?: string;
}

/**
 * Payload for the kraken_embed.custom_order.cancelled webhook event.
 */
export interface KrakenEmbedCustomOrderCancelledWebhookPayload {
  /**
   * ISO 8601 timestamp of when the custom order was cancelled.
   */
  cancelled_at: string;

  /**
   * The ID of the cancelled custom order.
   */
  custom_order_id: string;

  /**
   * A human-readable description of why the custom order was cancelled. Intended for
   * display and logging purposes only.
   */
  reason: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.custom_order.cancelled';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.custom_order.executed webhook event.
 */
export interface KrakenEmbedCustomOrderExecutedWebhookPayload {
  /**
   * The ID of the executed custom order.
   */
  custom_order_id: string;

  /**
   * ISO 8601 timestamp of when the custom order was executed.
   */
  executed_at: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.custom_order.executed';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.custom_order.execution_failed webhook event.
 */
export interface KrakenEmbedCustomOrderExecutionFailedWebhookPayload {
  /**
   * The ID of the custom order that failed to execute.
   */
  custom_order_id: string;

  /**
   * ISO 8601 timestamp of when the custom order execution failed.
   */
  failed_at: string;

  /**
   * A human-readable description of why the custom order execution failed. Intended
   * for display and logging purposes only.
   */
  reason: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.custom_order.execution_failed';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.quote.cancelled webhook event.
 */
export interface KrakenEmbedQuoteCancelledWebhookPayload {
  /**
   * ISO 8601 timestamp of when the quote was cancelled.
   */
  cancelled_at: string;

  /**
   * The ID of the cancelled quote.
   */
  quote_id: string;

  /**
   * A human-readable description of why the quote was cancelled. Intended for
   * display and logging purposes only.
   */
  reason: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.quote.cancelled';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.quote_executed webhook event.
 */
export interface KrakenEmbedQuoteExecutedWebhookPayload {
  /**
   * ISO 8601 timestamp of when the quote was executed.
   */
  executed_at: string;

  /**
   * The ID of the executed quote.
   */
  quote_id: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.quote.executed';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.quote.execution_failed webhook event.
 */
export interface KrakenEmbedQuoteExecutionFailedWebhookPayload {
  /**
   * ISO 8601 timestamp of when the quote execution failed.
   */
  failed_at: string;

  /**
   * The ID of the quote that failed to execute.
   */
  quote_id: string;

  /**
   * A human-readable description of why the quote execution failed. Intended for
   * display and logging purposes only.
   */
  reason: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.quote.execution_failed';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.user.closed webhook event.
 */
export interface KrakenEmbedUserClosedWebhookPayload {
  /**
   * ISO 8601 timestamp of when the user was closed.
   */
  closed_at: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.user.closed';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.user.disabled webhook event.
 */
export interface KrakenEmbedUserDisabledWebhookPayload {
  /**
   * ISO 8601 timestamp of when the user was disabled.
   */
  disabled_at: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.user.disabled';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.user.verified webhook event.
 */
export interface KrakenEmbedUserVerifiedWebhookPayload {
  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.user.verified';

  /**
   * The ID of the user.
   */
  user_id: string;

  /**
   * ISO 8601 timestamp of when the user was verified.
   */
  verified_at: string;
}

/**
 * Payload for the mfa.disabled webhook event.
 */
export interface MfaDisabledWebhookPayload {
  /**
   * A multi-factor authentication method supported by the app.
   */
  method: AppsAPI.MfaMethod;

  /**
   * The type of webhook event.
   */
  type: 'mfa.disabled';

  /**
   * The ID of the user who disabled MFA.
   */
  user_id: string;
}

/**
 * Payload for the mfa.enabled webhook event.
 */
export interface MfaEnabledWebhookPayload {
  /**
   * A multi-factor authentication method supported by the app.
   */
  method: AppsAPI.MfaMethod;

  /**
   * The type of webhook event.
   */
  type: 'mfa.enabled';

  /**
   * The ID of the user who enabled MFA.
   */
  user_id: string;
}

/**
 * Payload for the wallet.private_key_export webhook event.
 */
export interface PrivateKeyExportWebhookPayload {
  /**
   * The type of webhook event.
   */
  type: 'wallet.private_key_export';

  /**
   * The ID of the user who exported the key.
   */
  user_id: string;

  /**
   * The address of the wallet.
   */
  wallet_address: string;

  /**
   * The ID of the wallet.
   */
  wallet_id: string;

  /**
   * The export type. 'display' is for showing the key to the user in the UI,
   * 'client' is for exporting to the client application.
   */
  export_source?: WalletsAPI.ExportType;
}

/**
 * Payload for the wallet.seed_phrase_export webhook event.
 */
export interface SeedPhraseExportWebhookPayload {
  /**
   * The type of webhook event.
   */
  type: 'wallet.seed_phrase_export';

  /**
   * The ID of the user who exported the seed phrase.
   */
  user_id: string;

  /**
   * The address of the wallet.
   */
  wallet_address: string;

  /**
   * The ID of the wallet.
   */
  wallet_id: string;

  /**
   * The export type. 'display' is for showing the key to the user in the UI,
   * 'client' is for exporting to the client application.
   */
  export_source?: WalletsAPI.ExportType;
}

/**
 * Payload for the transaction.broadcasted webhook event.
 */
export interface TransactionBroadcastedWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'transaction.broadcasted';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the transaction.confirmed webhook event.
 */
export interface TransactionConfirmedWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'transaction.confirmed';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the transaction.execution_reverted webhook event.
 */
export interface TransactionExecutionRevertedWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'transaction.execution_reverted';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the transaction.failed webhook event.
 */
export interface TransactionFailedWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'transaction.failed';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the transaction.provider_error webhook event.
 */
export interface TransactionProviderErrorWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'transaction.provider_error';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the transaction.replaced webhook event.
 */
export interface TransactionReplacedWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'transaction.replaced';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the transaction.still_pending webhook event.
 */
export interface TransactionStillPendingWebhookPayload {
  /**
   * The CAIP-2 chain identifier (e.g., eip155:1 for Ethereum mainnet).
   */
  caip2: string;

  /**
   * The blockchain transaction hash.
   */
  transaction_hash: string;

  /**
   * The Privy-assigned ID for this transaction.
   */
  transaction_id: string;

  /**
   * An unsigned standard Ethereum transaction object. Supports EVM transaction types
   * 0, 1, 2, and 4.
   */
  transaction_request: WalletsAPI.UnsignedStandardEthereumTransaction;

  /**
   * The type of webhook event.
   */
  type: 'transaction.still_pending';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;

  /**
   * Developer-provided reference ID for transaction reconciliation, if one was
   * provided.
   */
  reference_id?: string | null;
}

/**
 * Payload for the user.authenticated webhook event.
 */
export interface UserAuthenticatedWebhookPayload {
  /**
   * A linked account for the user.
   */
  account: UsersAPI.LinkedAccount;

  /**
   * The type of webhook event.
   */
  type: 'user.authenticated';

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;
}

/**
 * Payload for the user.created webhook event.
 */
export interface UserCreatedWebhookPayload {
  /**
   * The type of webhook event.
   */
  type: 'user.created';

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;
}

/**
 * Payload for the user.linked_account webhook event.
 */
export interface UserLinkedAccountWebhookPayload {
  /**
   * A linked account for the user.
   */
  account: UsersAPI.LinkedAccount;

  /**
   * The type of webhook event.
   */
  type: 'user.linked_account';

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;
}

/**
 * Payload for the user_operation.completed webhook event.
 */
export interface UserOperationCompletedWebhookPayload {
  actual_gas_cost: string;

  actual_gas_used: string;

  block_number: number;

  caip2: string;

  log_index: number;

  nonce: string;

  paymaster: string | null;

  sender: string;

  success: boolean;

  transaction_hash: string;

  /**
   * The type of webhook event.
   */
  type: 'user_operation.completed';

  user_op_hash: string;
}

/**
 * A reference to a user by their unique identifier.
 */
export interface UserReference {
  id: string;
}

/**
 * Payload for the user.transferred_account webhook event.
 */
export interface UserTransferredAccountWebhookPayload {
  /**
   * A linked account for the user.
   */
  account: UsersAPI.LinkedAccount;

  deletedUser: true;

  /**
   * A reference to a user by their unique identifier.
   */
  fromUser: UserReference;

  /**
   * A Privy user object.
   */
  toUser: UsersAPI.User;

  /**
   * The type of webhook event.
   */
  type: 'user.transferred_account';
}

/**
 * Payload for the user.unlinked_account webhook event.
 */
export interface UserUnlinkedAccountWebhookPayload {
  /**
   * A linked account for the user.
   */
  account: UsersAPI.LinkedAccount;

  /**
   * The type of webhook event.
   */
  type: 'user.unlinked_account';

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;
}

/**
 * Payload for the user.updated_account webhook event.
 */
export interface UserUpdatedAccountWebhookPayload {
  /**
   * A linked account for the user.
   */
  account: UsersAPI.LinkedAccount;

  /**
   * The type of webhook event.
   */
  type: 'user.updated_account';

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;
}

/**
 * Payload for the user.wallet_created webhook event.
 */
export interface UserWalletCreatedWebhookPayload {
  /**
   * The type of webhook event.
   */
  type: 'user.wallet_created';

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;

  /**
   * Base schema for wallet accounts linked to the user.
   */
  wallet: UsersAPI.LinkedAccountBaseWallet;
}

/**
 * Payload for the wallet_action.earn_deposit.created webhook event.
 */
export interface WalletActionEarnDepositCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of asset deposited (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * The status of the wallet action.
   */
  status: 'pending';

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_deposit.created';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset deposited (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_deposit.failed webhook event.
 */
export interface WalletActionEarnDepositFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action failed.
   */
  failed_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Base-unit amount of asset deposited (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * The status of the wallet action.
   */
  status: 'failed';

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_deposit.failed';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset deposited (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_deposit.rejected webhook event.
 */
export interface WalletActionEarnDepositRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Base-unit amount of asset deposited (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * ISO 8601 timestamp of when the wallet action was rejected.
   */
  rejected_at: string;

  /**
   * The status of the wallet action.
   */
  status: 'rejected';

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_deposit.rejected';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset deposited (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_deposit.succeeded webhook event.
 */
export interface WalletActionEarnDepositSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action completed successfully.
   */
  completed_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of asset deposited (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * Vault shares received in base units.
   */
  share_amount: string;

  /**
   * The status of the wallet action.
   */
  status: 'succeeded';

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_deposit.succeeded';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset deposited (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_incentive_claim.created webhook event.
 */
export interface WalletActionEarnIncentiveClaimCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * EVM chain name (e.g. "base", "ethereum").
   */
  chain: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Claimed reward tokens. Populated after the preparation step fetches from Merkl.
   */
  rewards: Array<ActionsAPI.EarnIncetiveClaimRewardEntry> | null;

  /**
   * The status of the wallet action.
   */
  status: 'pending';

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_incentive_claim.created';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.earn_incentive_claim.failed webhook event.
 */
export interface WalletActionEarnIncentiveClaimFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * EVM chain name (e.g. "base", "ethereum").
   */
  chain: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action failed.
   */
  failed_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Claimed reward tokens. Populated after the preparation step fetches from Merkl.
   */
  rewards: Array<ActionsAPI.EarnIncetiveClaimRewardEntry> | null;

  /**
   * The status of the wallet action.
   */
  status: 'failed';

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_incentive_claim.failed';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.earn_incentive_claim.rejected webhook event.
 */
export interface WalletActionEarnIncentiveClaimRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * EVM chain name (e.g. "base", "ethereum").
   */
  chain: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * ISO 8601 timestamp of when the wallet action was rejected.
   */
  rejected_at: string;

  /**
   * Claimed reward tokens. Populated after the preparation step fetches from Merkl.
   */
  rewards: Array<ActionsAPI.EarnIncetiveClaimRewardEntry> | null;

  /**
   * The status of the wallet action.
   */
  status: 'rejected';

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_incentive_claim.rejected';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.earn_incentive_claim.succeeded webhook event.
 */
export interface WalletActionEarnIncentiveClaimSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * EVM chain name (e.g. "base", "ethereum").
   */
  chain: string;

  /**
   * ISO 8601 timestamp of when the wallet action completed successfully.
   */
  completed_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Claimed reward tokens. Populated after the preparation step fetches from Merkl.
   */
  rewards: Array<ActionsAPI.EarnIncetiveClaimRewardEntry> | null;

  /**
   * The status of the wallet action.
   */
  status: 'succeeded';

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_incentive_claim.succeeded';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.earn_withdraw.created webhook event.
 */
export interface WalletActionEarnWithdrawCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of asset withdrawn (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * The status of the wallet action.
   */
  status: 'pending';

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_withdraw.created';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset withdrawn (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_withdraw.failed webhook event.
 */
export interface WalletActionEarnWithdrawFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action failed.
   */
  failed_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Base-unit amount of asset withdrawn (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * The status of the wallet action.
   */
  status: 'failed';

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_withdraw.failed';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset withdrawn (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_withdraw.rejected webhook event.
 */
export interface WalletActionEarnWithdrawRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Base-unit amount of asset withdrawn (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * ISO 8601 timestamp of when the wallet action was rejected.
   */
  rejected_at: string;

  /**
   * The status of the wallet action.
   */
  status: 'rejected';

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_withdraw.rejected';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset withdrawn (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.earn_withdraw.succeeded webhook event.
 */
export interface WalletActionEarnWithdrawSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action completed successfully.
   */
  completed_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of asset withdrawn (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * Vault shares burned in base units.
   */
  share_amount: string;

  /**
   * The status of the wallet action.
   */
  status: 'succeeded';

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.earn_withdraw.succeeded';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset withdrawn (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;
}

/**
 * Payload for the wallet_action.swap.created webhook event.
 */
export interface WalletActionSwapCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Amount of input token in base units. Populated after onchain confirmation.
   */
  input_amount: string | null;

  /**
   * Token address being sold.
   */
  input_token: string;

  /**
   * Token address being bought.
   */
  output_token: string;

  /**
   * The status of the wallet action.
   */
  status: 'pending';

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.swap.created';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.swap.failed webhook event.
 */
export interface WalletActionSwapFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action failed.
   */
  failed_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Amount of input token in base units. Populated after onchain confirmation.
   */
  input_amount: string | null;

  /**
   * Token address being sold.
   */
  input_token: string;

  /**
   * Token address being bought.
   */
  output_token: string;

  /**
   * The status of the wallet action.
   */
  status: 'failed';

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.swap.failed';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.swap.rejected webhook event.
 */
export interface WalletActionSwapRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Amount of input token in base units. Populated after onchain confirmation.
   */
  input_amount: string | null;

  /**
   * Token address being sold.
   */
  input_token: string;

  /**
   * Token address being bought.
   */
  output_token: string;

  /**
   * ISO 8601 timestamp of when the wallet action was rejected.
   */
  rejected_at: string;

  /**
   * The status of the wallet action.
   */
  status: 'rejected';

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.swap.rejected';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.swap.succeeded webhook event.
 */
export interface WalletActionSwapSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action completed successfully.
   */
  completed_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Amount of input token in base units. Populated after onchain confirmation.
   */
  input_amount: string | null;

  /**
   * Token address being sold.
   */
  input_token: string;

  /**
   * Amount of output token received, in base units. Populated after onchain
   * confirmation.
   */
  output_amount: string | null;

  /**
   * Token address being bought.
   */
  output_token: string;

  /**
   * The status of the wallet action.
   */
  status: 'succeeded';

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.swap.succeeded';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet_action.transfer.created webhook event.
 */
export interface WalletActionTransferCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * The status of the wallet action.
   */
  status: 'pending';

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.transfer.created';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Decimal amount sent on the source chain (e.g. "1.5"). Omitted for exact_output
   * cross-chain transfers until the source amount is determined.
   */
  source_amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Present when the transfer was initiated
   * with a named asset; omitted for custom-token transfers.
   */
  source_asset?: string;

  /**
   * Token contract address (EVM) or mint address (Solana). Present when the transfer
   * was initiated with `asset_address`.
   */
  source_asset_address?: string;

  /**
   * Number of decimals for the transferred token. Present when the transfer was
   * initiated with `asset_address` and the decimals were resolved onchain.
   */
  source_asset_decimals?: number;
}

/**
 * Payload for the wallet_action.transfer.failed webhook event.
 */
export interface WalletActionTransferFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * ISO 8601 timestamp of when the wallet action failed.
   */
  failed_at: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * The status of the wallet action.
   */
  status: 'failed';

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.transfer.failed';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Decimal amount sent on the source chain (e.g. "1.5"). Omitted for exact_output
   * cross-chain transfers until the source amount is determined.
   */
  source_amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Present when the transfer was initiated
   * with a named asset; omitted for custom-token transfers.
   */
  source_asset?: string;

  /**
   * Token contract address (EVM) or mint address (Solana). Present when the transfer
   * was initiated with `asset_address`.
   */
  source_asset_address?: string;

  /**
   * Number of decimals for the transferred token. Present when the transfer was
   * initiated with `asset_address` and the decimals were resolved onchain.
   */
  source_asset_decimals?: number;
}

/**
 * Payload for the wallet_action.transfer.rejected webhook event.
 */
export interface WalletActionTransferRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: ActionsAPI.FailureReason;

  /**
   * ISO 8601 timestamp of when the wallet action was rejected.
   */
  rejected_at: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * The status of the wallet action.
   */
  status: 'rejected';

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.transfer.rejected';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Decimal amount sent on the source chain (e.g. "1.5"). Omitted for exact_output
   * cross-chain transfers until the source amount is determined.
   */
  source_amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Present when the transfer was initiated
   * with a named asset; omitted for custom-token transfers.
   */
  source_asset?: string;

  /**
   * Token contract address (EVM) or mint address (Solana). Present when the transfer
   * was initiated with `asset_address`.
   */
  source_asset_address?: string;

  /**
   * Number of decimals for the transferred token. Present when the transfer was
   * initiated with `asset_address` and the decimals were resolved onchain.
   */
  source_asset_decimals?: number;
}

/**
 * Payload for the wallet_action.transfer.succeeded webhook event.
 */
export interface WalletActionTransferSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: ActionsAPI.WalletActionType;

  /**
   * ISO 8601 timestamp of when the wallet action completed successfully.
   */
  completed_at: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * The status of the wallet action.
   */
  status: 'succeeded';

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<ActionsAPI.WalletActionStep>;

  /**
   * The type of webhook event.
   */
  type: 'wallet_action.transfer.succeeded';

  /**
   * The ID of the wallet action.
   */
  wallet_action_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Decimal amount sent on the source chain (e.g. "1.5"). Omitted for exact_output
   * cross-chain transfers until the source amount is determined.
   */
  source_amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Present when the transfer was initiated
   * with a named asset; omitted for custom-token transfers.
   */
  source_asset?: string;

  /**
   * Token contract address (EVM) or mint address (Solana). Present when the transfer
   * was initiated with `asset_address`.
   */
  source_asset_address?: string;

  /**
   * Number of decimals for the transferred token. Present when the transfer was
   * initiated with `asset_address` and the decimals were resolved onchain.
   */
  source_asset_decimals?: number;
}

/**
 * Payload for the wallet.archived webhook event.
 */
export interface WalletArchivedWebhookPayload {
  /**
   * Unix timestamp of when the wallet was archived.
   */
  archived_at: number;

  /**
   * The chain type of the archived wallet.
   */
  chain_type: string;

  /**
   * The type of webhook event.
   */
  type: 'wallet.archived';

  /**
   * The address of the archived wallet.
   */
  wallet_address: string;

  /**
   * The ID of the archived wallet.
   */
  wallet_id: string;
}

/**
 * An asset involved in a wallet transfer.
 */
export type WalletFundsAsset =
  | WalletFundsNativeTokenAsset
  | WalletFundsErc20Asset
  | WalletFundsSplAsset
  | WalletFundsSacAsset;

/**
 * An ERC-20 token asset.
 */
export interface WalletFundsErc20Asset {
  address: string;

  type: 'erc20';
}

/**
 * A native token asset (e.g. ETH, SOL).
 */
export interface WalletFundsNativeTokenAsset {
  address: null;

  type: 'native-token';
}

/**
 * A Stellar Asset Contract (SAC) asset.
 */
export interface WalletFundsSacAsset {
  address: string;

  type: 'sac';
}

/**
 * A Solana SPL token asset.
 */
export interface WalletFundsSplAsset {
  mint: string;

  type: 'spl';
}

/**
 * Payload for the wallet.recovered webhook event.
 */
export interface WalletRecoveredWebhookPayload {
  /**
   * The type of webhook event.
   */
  type: 'wallet.recovered';

  /**
   * The ID of the user.
   */
  user_id: string;

  /**
   * The address of the wallet.
   */
  wallet_address: string;

  /**
   * The ID of the wallet.
   */
  wallet_id: string;
}

/**
 * Recovery method types for embedded wallet recovery setup webhooks.
 */
export type WalletRecoverySetupMethod =
  | 'user_passcode_derived_recovery_key'
  | 'privy_passcode_derived_recovery_key'
  | 'privy_generated_recovery_key'
  | 'google_drive_recovery_secret'
  | 'icloud_recovery_secret'
  | 'recovery_encryption_key';

/**
 * Payload for the wallet.recovery_setup webhook event.
 */
export interface WalletRecoverySetupWebhookPayload {
  /**
   * Recovery method types for embedded wallet recovery setup webhooks.
   */
  method: WalletRecoverySetupMethod;

  /**
   * The type of webhook event.
   */
  type: 'wallet.recovery_setup';

  /**
   * The ID of the user.
   */
  user_id: string;

  /**
   * The address of the wallet.
   */
  wallet_address: string;

  /**
   * The ID of the wallet.
   */
  wallet_id: string;
}

/**
 * Payload for the wallet.restored webhook event.
 */
export interface WalletRestoredWebhookPayload {
  /**
   * The chain type of the restored wallet.
   */
  chain_type: string;

  /**
   * The type of webhook event.
   */
  type: 'wallet.restored';

  /**
   * The address of the restored wallet.
   */
  wallet_address: string;

  /**
   * The ID of the restored wallet.
   */
  wallet_id: string;
}

/**
 * Union of all webhook payload schemas.
 */
export type WebhookPayload =
  | UserCreatedWebhookPayload
  | UserAuthenticatedWebhookPayload
  | UserLinkedAccountWebhookPayload
  | UserUnlinkedAccountWebhookPayload
  | UserUpdatedAccountWebhookPayload
  | UserTransferredAccountWebhookPayload
  | UserWalletCreatedWebhookPayload
  | TransactionBroadcastedWebhookPayload
  | TransactionConfirmedWebhookPayload
  | TransactionExecutionRevertedWebhookPayload
  | TransactionStillPendingWebhookPayload
  | TransactionFailedWebhookPayload
  | TransactionReplacedWebhookPayload
  | TransactionProviderErrorWebhookPayload
  | FundsDepositedWebhookPayload
  | FundsWithdrawnWebhookPayload
  | PrivateKeyExportWebhookPayload
  | SeedPhraseExportWebhookPayload
  | WalletRecoverySetupWebhookPayload
  | WalletRecoveredWebhookPayload
  | WalletArchivedWebhookPayload
  | WalletRestoredWebhookPayload
  | MfaEnabledWebhookPayload
  | MfaDisabledWebhookPayload
  | YieldDepositConfirmedWebhookPayload
  | YieldWithdrawConfirmedWebhookPayload
  | YieldClaimConfirmedWebhookPayload
  | UserOperationCompletedWebhookPayload
  | IntentCreatedWebhookPayload
  | IntentAuthorizedWebhookPayload
  | IntentRejectedWebhookPayload
  | IntentExecutedWebhookPayload
  | IntentFailedWebhookPayload
  | WalletActionSwapCreatedWebhookPayload
  | WalletActionSwapSucceededWebhookPayload
  | WalletActionSwapRejectedWebhookPayload
  | WalletActionSwapFailedWebhookPayload
  | WalletActionTransferCreatedWebhookPayload
  | WalletActionTransferSucceededWebhookPayload
  | WalletActionTransferRejectedWebhookPayload
  | WalletActionTransferFailedWebhookPayload
  | WalletActionEarnDepositCreatedWebhookPayload
  | WalletActionEarnDepositSucceededWebhookPayload
  | WalletActionEarnDepositRejectedWebhookPayload
  | WalletActionEarnDepositFailedWebhookPayload
  | WalletActionEarnWithdrawCreatedWebhookPayload
  | WalletActionEarnWithdrawSucceededWebhookPayload
  | WalletActionEarnWithdrawRejectedWebhookPayload
  | WalletActionEarnWithdrawFailedWebhookPayload
  | WalletActionEarnIncentiveClaimCreatedWebhookPayload
  | WalletActionEarnIncentiveClaimSucceededWebhookPayload
  | WalletActionEarnIncentiveClaimRejectedWebhookPayload
  | WalletActionEarnIncentiveClaimFailedWebhookPayload;

/**
 * Payload for the yield.claim.confirmed webhook event.
 */
export interface YieldClaimConfirmedWebhookPayload {
  caip2: string;

  rewards: Array<YieldClaimReward>;

  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'yield.claim.confirmed';

  wallet_id: string;
}

/**
 * A single reward token claimed from a yield vault.
 */
export interface YieldClaimReward {
  amount: string;

  token_address: string;

  token_symbol: string;
}

/**
 * Payload for the yield.deposit.confirmed webhook event.
 */
export interface YieldDepositConfirmedWebhookPayload {
  assets: string;

  caip2: string;

  owner: string;

  sender: string;

  shares: string;

  /**
   * The type of webhook event.
   */
  type: 'yield.deposit.confirmed';

  vault_address: string;
}

/**
 * Payload for the yield.withdraw.confirmed webhook event.
 */
export interface YieldWithdrawConfirmedWebhookPayload {
  assets: string;

  caip2: string;

  owner: string;

  receiver: string;

  sender: string;

  shares: string;

  /**
   * The type of webhook event.
   */
  type: 'yield.withdraw.confirmed';

  vault_address: string;
}

/**
 * Payload for the intent.authorized webhook event.
 */
export type UnsafeUnwrapWebhookEvent =
  | IntentAuthorizedWebhookPayload
  | IntentCreatedWebhookPayload
  | IntentExecutedWebhookPayload
  | IntentFailedWebhookPayload
  | IntentRejectedWebhookPayload
  | MfaDisabledWebhookPayload
  | MfaEnabledWebhookPayload
  | TransactionBroadcastedWebhookPayload
  | TransactionConfirmedWebhookPayload
  | TransactionExecutionRevertedWebhookPayload
  | TransactionFailedWebhookPayload
  | TransactionProviderErrorWebhookPayload
  | TransactionReplacedWebhookPayload
  | TransactionStillPendingWebhookPayload
  | UserAuthenticatedWebhookPayload
  | UserCreatedWebhookPayload
  | UserLinkedAccountWebhookPayload
  | UserTransferredAccountWebhookPayload
  | UserUnlinkedAccountWebhookPayload
  | UserUpdatedAccountWebhookPayload
  | UserWalletCreatedWebhookPayload
  | UserOperationCompletedWebhookPayload
  | WalletArchivedWebhookPayload
  | FundsDepositedWebhookPayload
  | FundsWithdrawnWebhookPayload
  | PrivateKeyExportWebhookPayload
  | WalletRecoveredWebhookPayload
  | WalletRecoverySetupWebhookPayload
  | WalletRestoredWebhookPayload
  | WalletActionEarnDepositCreatedWebhookPayload
  | WalletActionEarnDepositFailedWebhookPayload
  | WalletActionEarnDepositRejectedWebhookPayload
  | WalletActionEarnDepositSucceededWebhookPayload
  | WalletActionEarnIncentiveClaimCreatedWebhookPayload
  | WalletActionEarnIncentiveClaimFailedWebhookPayload
  | WalletActionEarnIncentiveClaimRejectedWebhookPayload
  | WalletActionEarnIncentiveClaimSucceededWebhookPayload
  | WalletActionEarnWithdrawCreatedWebhookPayload
  | WalletActionEarnWithdrawFailedWebhookPayload
  | WalletActionEarnWithdrawRejectedWebhookPayload
  | WalletActionEarnWithdrawSucceededWebhookPayload
  | WalletActionSwapCreatedWebhookPayload
  | WalletActionSwapFailedWebhookPayload
  | WalletActionSwapRejectedWebhookPayload
  | WalletActionSwapSucceededWebhookPayload
  | WalletActionTransferCreatedWebhookPayload
  | WalletActionTransferFailedWebhookPayload
  | WalletActionTransferRejectedWebhookPayload
  | WalletActionTransferSucceededWebhookPayload
  | YieldClaimConfirmedWebhookPayload
  | YieldDepositConfirmedWebhookPayload
  | YieldWithdrawConfirmedWebhookPayload;

export declare namespace Webhooks {
  export {
    type BlockInfo as BlockInfo,
    type BridgeCryptoDepositMetadata as BridgeCryptoDepositMetadata,
    type BridgeCryptoTransferMetadata as BridgeCryptoTransferMetadata,
    type BridgeFiatDepositMetadata as BridgeFiatDepositMetadata,
    type BridgeFiatTransferMetadata as BridgeFiatTransferMetadata,
    type BridgeMetadata as BridgeMetadata,
    type BridgeRefundMetadata as BridgeRefundMetadata,
    type BridgeStaticMemoDepositMetadata as BridgeStaticMemoDepositMetadata,
    type BridgeTransferRefundMetadata as BridgeTransferRefundMetadata,
    type FundsDepositedWebhookPayload as FundsDepositedWebhookPayload,
    type FundsWithdrawnWebhookPayload as FundsWithdrawnWebhookPayload,
    type IntentAuthorizedWebhookPayload as IntentAuthorizedWebhookPayload,
    type IntentCreatedWebhookPayload as IntentCreatedWebhookPayload,
    type IntentExecutedWebhookPayload as IntentExecutedWebhookPayload,
    type IntentFailedWebhookPayload as IntentFailedWebhookPayload,
    type IntentRejectedWebhookPayload as IntentRejectedWebhookPayload,
    type KrakenEmbedCustomOrderCancelledWebhookPayload as KrakenEmbedCustomOrderCancelledWebhookPayload,
    type KrakenEmbedCustomOrderExecutedWebhookPayload as KrakenEmbedCustomOrderExecutedWebhookPayload,
    type KrakenEmbedCustomOrderExecutionFailedWebhookPayload as KrakenEmbedCustomOrderExecutionFailedWebhookPayload,
    type KrakenEmbedQuoteCancelledWebhookPayload as KrakenEmbedQuoteCancelledWebhookPayload,
    type KrakenEmbedQuoteExecutedWebhookPayload as KrakenEmbedQuoteExecutedWebhookPayload,
    type KrakenEmbedQuoteExecutionFailedWebhookPayload as KrakenEmbedQuoteExecutionFailedWebhookPayload,
    type KrakenEmbedUserClosedWebhookPayload as KrakenEmbedUserClosedWebhookPayload,
    type KrakenEmbedUserDisabledWebhookPayload as KrakenEmbedUserDisabledWebhookPayload,
    type KrakenEmbedUserVerifiedWebhookPayload as KrakenEmbedUserVerifiedWebhookPayload,
    type MfaDisabledWebhookPayload as MfaDisabledWebhookPayload,
    type MfaEnabledWebhookPayload as MfaEnabledWebhookPayload,
    type PrivateKeyExportWebhookPayload as PrivateKeyExportWebhookPayload,
    type SeedPhraseExportWebhookPayload as SeedPhraseExportWebhookPayload,
    type TransactionBroadcastedWebhookPayload as TransactionBroadcastedWebhookPayload,
    type TransactionConfirmedWebhookPayload as TransactionConfirmedWebhookPayload,
    type TransactionExecutionRevertedWebhookPayload as TransactionExecutionRevertedWebhookPayload,
    type TransactionFailedWebhookPayload as TransactionFailedWebhookPayload,
    type TransactionProviderErrorWebhookPayload as TransactionProviderErrorWebhookPayload,
    type TransactionReplacedWebhookPayload as TransactionReplacedWebhookPayload,
    type TransactionStillPendingWebhookPayload as TransactionStillPendingWebhookPayload,
    type UserAuthenticatedWebhookPayload as UserAuthenticatedWebhookPayload,
    type UserCreatedWebhookPayload as UserCreatedWebhookPayload,
    type UserLinkedAccountWebhookPayload as UserLinkedAccountWebhookPayload,
    type UserOperationCompletedWebhookPayload as UserOperationCompletedWebhookPayload,
    type UserReference as UserReference,
    type UserTransferredAccountWebhookPayload as UserTransferredAccountWebhookPayload,
    type UserUnlinkedAccountWebhookPayload as UserUnlinkedAccountWebhookPayload,
    type UserUpdatedAccountWebhookPayload as UserUpdatedAccountWebhookPayload,
    type UserWalletCreatedWebhookPayload as UserWalletCreatedWebhookPayload,
    type WalletActionEarnDepositCreatedWebhookPayload as WalletActionEarnDepositCreatedWebhookPayload,
    type WalletActionEarnDepositFailedWebhookPayload as WalletActionEarnDepositFailedWebhookPayload,
    type WalletActionEarnDepositRejectedWebhookPayload as WalletActionEarnDepositRejectedWebhookPayload,
    type WalletActionEarnDepositSucceededWebhookPayload as WalletActionEarnDepositSucceededWebhookPayload,
    type WalletActionEarnIncentiveClaimCreatedWebhookPayload as WalletActionEarnIncentiveClaimCreatedWebhookPayload,
    type WalletActionEarnIncentiveClaimFailedWebhookPayload as WalletActionEarnIncentiveClaimFailedWebhookPayload,
    type WalletActionEarnIncentiveClaimRejectedWebhookPayload as WalletActionEarnIncentiveClaimRejectedWebhookPayload,
    type WalletActionEarnIncentiveClaimSucceededWebhookPayload as WalletActionEarnIncentiveClaimSucceededWebhookPayload,
    type WalletActionEarnWithdrawCreatedWebhookPayload as WalletActionEarnWithdrawCreatedWebhookPayload,
    type WalletActionEarnWithdrawFailedWebhookPayload as WalletActionEarnWithdrawFailedWebhookPayload,
    type WalletActionEarnWithdrawRejectedWebhookPayload as WalletActionEarnWithdrawRejectedWebhookPayload,
    type WalletActionEarnWithdrawSucceededWebhookPayload as WalletActionEarnWithdrawSucceededWebhookPayload,
    type WalletActionSwapCreatedWebhookPayload as WalletActionSwapCreatedWebhookPayload,
    type WalletActionSwapFailedWebhookPayload as WalletActionSwapFailedWebhookPayload,
    type WalletActionSwapRejectedWebhookPayload as WalletActionSwapRejectedWebhookPayload,
    type WalletActionSwapSucceededWebhookPayload as WalletActionSwapSucceededWebhookPayload,
    type WalletActionTransferCreatedWebhookPayload as WalletActionTransferCreatedWebhookPayload,
    type WalletActionTransferFailedWebhookPayload as WalletActionTransferFailedWebhookPayload,
    type WalletActionTransferRejectedWebhookPayload as WalletActionTransferRejectedWebhookPayload,
    type WalletActionTransferSucceededWebhookPayload as WalletActionTransferSucceededWebhookPayload,
    type WalletArchivedWebhookPayload as WalletArchivedWebhookPayload,
    type WalletFundsAsset as WalletFundsAsset,
    type WalletFundsErc20Asset as WalletFundsErc20Asset,
    type WalletFundsNativeTokenAsset as WalletFundsNativeTokenAsset,
    type WalletFundsSacAsset as WalletFundsSacAsset,
    type WalletFundsSplAsset as WalletFundsSplAsset,
    type WalletRecoveredWebhookPayload as WalletRecoveredWebhookPayload,
    type WalletRecoverySetupMethod as WalletRecoverySetupMethod,
    type WalletRecoverySetupWebhookPayload as WalletRecoverySetupWebhookPayload,
    type WalletRestoredWebhookPayload as WalletRestoredWebhookPayload,
    type WebhookPayload as WebhookPayload,
    type YieldClaimConfirmedWebhookPayload as YieldClaimConfirmedWebhookPayload,
    type YieldClaimReward as YieldClaimReward,
    type YieldDepositConfirmedWebhookPayload as YieldDepositConfirmedWebhookPayload,
    type YieldWithdrawConfirmedWebhookPayload as YieldWithdrawConfirmedWebhookPayload,
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
  };
}
