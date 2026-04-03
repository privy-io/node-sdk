// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntentsAPI from './intents';
import * as UsersAPI from './users';
import * as WalletActionsAPI from './wallet-actions';
import * as WalletsAPI from './wallets/wallets';

export class Webhooks extends APIResource {}

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
 * Payload for the mfa.enabled webhook event.
 */
export interface MfaEnabledWebhookPayload {
  /**
   * The MFA method that was enabled.
   */
  method: 'sms' | 'totp' | 'passkey';

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
 * Payload for the mfa.disabled webhook event.
 */
export interface MfaDisabledWebhookPayload {
  /**
   * The MFA method that was disabled.
   */
  method: 'sms' | 'totp' | 'passkey';

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
   * An unsigned Ethereum transaction object.
   */
  transaction_request: WalletsAPI.UnsignedEthereumTransaction;

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
 * Payload for the user.transferred_account webhook event.
 */
export interface UserTransferredAccountWebhookPayload {
  /**
   * A linked account for the user.
   */
  account: UsersAPI.LinkedAccount;

  deletedUser: true;

  fromUser: UserTransferredAccountWebhookPayload.FromUser;

  /**
   * A Privy user object.
   */
  toUser: UsersAPI.User;

  /**
   * The type of webhook event.
   */
  type: 'user.transferred_account';
}

export namespace UserTransferredAccountWebhookPayload {
  export interface FromUser {
    id: string;
  }
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
 * Payload for the wallet_action.swap.created webhook event.
 */
export interface WalletActionSwapCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * Amount of input token in base units. Populated after on-chain confirmation.
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
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

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
 * Payload for the wallet_action.swap.succeeded webhook event.
 */
export interface WalletActionSwapSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * Amount of input token in base units. Populated after on-chain confirmation.
   */
  input_amount: string | null;

  /**
   * Token address being sold.
   */
  input_token: string;

  /**
   * Amount of output token received, in base units. Populated after on-chain
   * confirmation.
   */
  output_amount: string | null;

  /**
   * Token address being bought.
   */
  output_token: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<WalletActionsAPI.WalletActionStep>;

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
 * Payload for the wallet_action.swap.rejected webhook event.
 */
export interface WalletActionSwapRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: WalletActionsAPI.FailureReason;

  /**
   * Amount of input token in base units. Populated after on-chain confirmation.
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
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<WalletActionsAPI.WalletActionStep>;

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
 * Payload for the wallet_action.swap.failed webhook event.
 */
export interface WalletActionSwapFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: WalletActionsAPI.FailureReason;

  /**
   * Amount of input token in base units. Populated after on-chain confirmation.
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
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<WalletActionsAPI.WalletActionStep>;

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
 * Payload for the wallet_action.transfer.created webhook event.
 */
export interface WalletActionTransferCreatedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * Decimal amount as provided by the user (e.g. "1.5").
   */
  source_amount: string;

  /**
   * Asset identifier (e.g. "usdc", "eth").
   */
  source_asset: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

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
}

/**
 * Payload for the wallet_action.transfer.succeeded webhook event.
 */
export interface WalletActionTransferSucceededWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * Decimal amount as provided by the user (e.g. "1.5").
   */
  source_amount: string;

  /**
   * Asset identifier (e.g. "usdc", "eth").
   */
  source_asset: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

  /**
   * The steps of the wallet action, including transaction hashes.
   */
  steps: Array<WalletActionsAPI.WalletActionStep>;

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
}

/**
 * Payload for the wallet_action.transfer.rejected webhook event.
 */
export interface WalletActionTransferRejectedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: WalletActionsAPI.FailureReason;

  /**
   * Decimal amount as provided by the user (e.g. "1.5").
   */
  source_amount: string;

  /**
   * Asset identifier (e.g. "usdc", "eth").
   */
  source_asset: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

  /**
   * The steps of the wallet action at the time of rejection.
   */
  steps: Array<WalletActionsAPI.WalletActionStep>;

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
}

/**
 * Payload for the wallet_action.transfer.failed webhook event.
 */
export interface WalletActionTransferFailedWebhookPayload {
  /**
   * Type of wallet action
   */
  action_type: WalletActionsAPI.WalletActionType;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason: WalletActionsAPI.FailureReason;

  /**
   * Decimal amount as provided by the user (e.g. "1.5").
   */
  source_amount: string;

  /**
   * Asset identifier (e.g. "usdc", "eth").
   */
  source_asset: string;

  /**
   * Chain name (e.g. "base", "ethereum").
   */
  source_chain: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionsAPI.WalletActionStatus;

  /**
   * The steps of the wallet action. Completed steps will have transaction hashes;
   * the failing step will have a failure_reason.
   */
  steps: Array<WalletActionsAPI.WalletActionStep>;

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
   * The asset type being transferred.
   */
  asset:
    | FundsDepositedWebhookPayload.UnionMember0
    | FundsDepositedWebhookPayload.UnionMember1
    | FundsDepositedWebhookPayload.UnionMember2
    | FundsDepositedWebhookPayload.UnionMember3;

  block: FundsDepositedWebhookPayload.Block;

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
   * Optional Bridge metadata for custodial wallet deposits.
   */
  bridge_metadata?:
    | FundsDepositedWebhookPayload.BridgeMetadataUnionMember0
    | FundsDepositedWebhookPayload.BridgeMetadataUnionMember1
    | FundsDepositedWebhookPayload.BridgeMetadataUnionMember2
    | FundsDepositedWebhookPayload.BridgeMetadataUnionMember3
    | FundsDepositedWebhookPayload.BridgeMetadataUnionMember4
    | FundsDepositedWebhookPayload.BridgeMetadataUnionMember5;

  /**
   * The transaction fee paid, as a stringified bigint in the chain's native token.
   */
  transaction_fee?: string;
}

export namespace FundsDepositedWebhookPayload {
  export interface UnionMember0 {
    address: null;

    type: 'native-token';
  }

  export interface UnionMember1 {
    address: string;

    type: 'erc20';
  }

  export interface UnionMember2 {
    mint: string;

    type: 'spl';
  }

  export interface UnionMember3 {
    address: string;

    type: 'sac';
  }

  export interface Block {
    /**
     * The block number.
     */
    number: number;

    /**
     * The block timestamp.
     */
    timestamp: number;
  }

  export interface BridgeMetadataUnionMember0 {
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

  export interface BridgeMetadataUnionMember1 {
    drain_id: string;

    liquidation_address_id: string;

    method: 'liquidation_address';

    /**
     * The original deposit transaction hash that triggered the failed drain.
     */
    original_transaction_hash: string;

    type: 'refund';
  }

  export interface BridgeMetadataUnionMember2 {
    activity_id: string;

    method: 'virtual_account';

    type: 'fiat_deposit';

    virtual_account_id: string;
  }

  export interface BridgeMetadataUnionMember3 {
    method: 'transfer';

    /**
     * The wallet address that sent the transfer.
     */
    source_wallet_address: string;

    transfer_id: string;

    type: 'crypto_deposit';
  }

  export interface BridgeMetadataUnionMember4 {
    method: 'transfer';

    transfer_id: string;

    type: 'fiat_deposit';
  }

  export interface BridgeMetadataUnionMember5 {
    method: 'transfer';

    transfer_id: string;

    type: 'refund';

    /**
     * The original transfer transaction hash (if available).
     */
    original_transaction_hash?: string;
  }
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
   * The asset type being transferred.
   */
  asset:
    | FundsWithdrawnWebhookPayload.UnionMember0
    | FundsWithdrawnWebhookPayload.UnionMember1
    | FundsWithdrawnWebhookPayload.UnionMember2
    | FundsWithdrawnWebhookPayload.UnionMember3;

  block: FundsWithdrawnWebhookPayload.Block;

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

export namespace FundsWithdrawnWebhookPayload {
  export interface UnionMember0 {
    address: null;

    type: 'native-token';
  }

  export interface UnionMember1 {
    address: string;

    type: 'erc20';
  }

  export interface UnionMember2 {
    mint: string;

    type: 'spl';
  }

  export interface UnionMember3 {
    address: string;

    type: 'sac';
  }

  export interface Block {
    /**
     * The block number.
     */
    number: number;

    /**
     * The block timestamp.
     */
    timestamp: number;
  }
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

  export_source?: 'display' | 'client';
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

  export_source?: 'display' | 'client';
}

/**
 * Payload for the wallet.recovery_setup webhook event.
 */
export interface WalletRecoverySetupWebhookPayload {
  /**
   * The recovery method that was set up.
   */
  method:
    | 'user_passcode_derived_recovery_key'
    | 'privy_passcode_derived_recovery_key'
    | 'privy_generated_recovery_key'
    | 'google_drive_recovery_secret'
    | 'icloud_recovery_secret'
    | 'recovery_encryption_key';

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
 * Payload for the yield.claim.confirmed webhook event.
 */
export interface YieldClaimConfirmedWebhookPayload {
  caip2: string;

  rewards: Array<YieldClaimConfirmedWebhookPayload.Reward>;

  transaction_id: string;

  /**
   * The type of webhook event.
   */
  type: 'yield.claim.confirmed';

  wallet_id: string;
}

export namespace YieldClaimConfirmedWebhookPayload {
  export interface Reward {
    amount: string;

    token_address: string;

    token_symbol: string;
  }
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
  | MfaEnabledWebhookPayload
  | MfaDisabledWebhookPayload
  | YieldDepositConfirmedWebhookPayload
  | YieldWithdrawConfirmedWebhookPayload
  | YieldClaimConfirmedWebhookPayload
  | UserOperationCompletedWebhookPayload
  | IntentCreatedWebhookPayload
  | IntentAuthorizedWebhookPayload
  | IntentExecutedWebhookPayload
  | IntentFailedWebhookPayload
  | WalletActionSwapCreatedWebhookPayload
  | WalletActionSwapSucceededWebhookPayload
  | WalletActionSwapRejectedWebhookPayload
  | WalletActionSwapFailedWebhookPayload
  | WalletActionTransferCreatedWebhookPayload
  | WalletActionTransferSucceededWebhookPayload
  | WalletActionTransferRejectedWebhookPayload
  | WalletActionTransferFailedWebhookPayload;

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

export declare namespace Webhooks {
  export {
    type IntentCreatedWebhookPayload as IntentCreatedWebhookPayload,
    type IntentAuthorizedWebhookPayload as IntentAuthorizedWebhookPayload,
    type IntentExecutedWebhookPayload as IntentExecutedWebhookPayload,
    type IntentFailedWebhookPayload as IntentFailedWebhookPayload,
    type MfaEnabledWebhookPayload as MfaEnabledWebhookPayload,
    type MfaDisabledWebhookPayload as MfaDisabledWebhookPayload,
    type TransactionBroadcastedWebhookPayload as TransactionBroadcastedWebhookPayload,
    type TransactionConfirmedWebhookPayload as TransactionConfirmedWebhookPayload,
    type TransactionExecutionRevertedWebhookPayload as TransactionExecutionRevertedWebhookPayload,
    type TransactionStillPendingWebhookPayload as TransactionStillPendingWebhookPayload,
    type TransactionFailedWebhookPayload as TransactionFailedWebhookPayload,
    type TransactionReplacedWebhookPayload as TransactionReplacedWebhookPayload,
    type TransactionProviderErrorWebhookPayload as TransactionProviderErrorWebhookPayload,
    type UserOperationCompletedWebhookPayload as UserOperationCompletedWebhookPayload,
    type UserCreatedWebhookPayload as UserCreatedWebhookPayload,
    type UserAuthenticatedWebhookPayload as UserAuthenticatedWebhookPayload,
    type UserLinkedAccountWebhookPayload as UserLinkedAccountWebhookPayload,
    type UserUnlinkedAccountWebhookPayload as UserUnlinkedAccountWebhookPayload,
    type UserUpdatedAccountWebhookPayload as UserUpdatedAccountWebhookPayload,
    type UserTransferredAccountWebhookPayload as UserTransferredAccountWebhookPayload,
    type UserWalletCreatedWebhookPayload as UserWalletCreatedWebhookPayload,
    type WalletActionSwapCreatedWebhookPayload as WalletActionSwapCreatedWebhookPayload,
    type WalletActionSwapSucceededWebhookPayload as WalletActionSwapSucceededWebhookPayload,
    type WalletActionSwapRejectedWebhookPayload as WalletActionSwapRejectedWebhookPayload,
    type WalletActionSwapFailedWebhookPayload as WalletActionSwapFailedWebhookPayload,
    type WalletActionTransferCreatedWebhookPayload as WalletActionTransferCreatedWebhookPayload,
    type WalletActionTransferSucceededWebhookPayload as WalletActionTransferSucceededWebhookPayload,
    type WalletActionTransferRejectedWebhookPayload as WalletActionTransferRejectedWebhookPayload,
    type WalletActionTransferFailedWebhookPayload as WalletActionTransferFailedWebhookPayload,
    type FundsDepositedWebhookPayload as FundsDepositedWebhookPayload,
    type FundsWithdrawnWebhookPayload as FundsWithdrawnWebhookPayload,
    type PrivateKeyExportWebhookPayload as PrivateKeyExportWebhookPayload,
    type SeedPhraseExportWebhookPayload as SeedPhraseExportWebhookPayload,
    type WalletRecoverySetupWebhookPayload as WalletRecoverySetupWebhookPayload,
    type WalletRecoveredWebhookPayload as WalletRecoveredWebhookPayload,
    type YieldDepositConfirmedWebhookPayload as YieldDepositConfirmedWebhookPayload,
    type YieldWithdrawConfirmedWebhookPayload as YieldWithdrawConfirmedWebhookPayload,
    type YieldClaimConfirmedWebhookPayload as YieldClaimConfirmedWebhookPayload,
    type WebhookPayload as WebhookPayload,
    type KrakenEmbedQuoteExecutedWebhookPayload as KrakenEmbedQuoteExecutedWebhookPayload,
    type KrakenEmbedQuoteExecutionFailedWebhookPayload as KrakenEmbedQuoteExecutionFailedWebhookPayload,
    type KrakenEmbedQuoteCancelledWebhookPayload as KrakenEmbedQuoteCancelledWebhookPayload,
    type KrakenEmbedUserVerifiedWebhookPayload as KrakenEmbedUserVerifiedWebhookPayload,
    type KrakenEmbedUserDisabledWebhookPayload as KrakenEmbedUserDisabledWebhookPayload,
    type KrakenEmbedUserClosedWebhookPayload as KrakenEmbedUserClosedWebhookPayload,
  };
}
