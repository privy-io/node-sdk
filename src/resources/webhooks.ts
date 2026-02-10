// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as UsersAPI from './users';

export class Webhooks extends APIResource {}

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
   * The original transaction request that is still pending.
   */
  transaction_request: TransactionStillPendingWebhookPayload.TransactionRequest;

  /**
   * The type of webhook event.
   */
  type: 'transaction.still_pending';

  /**
   * The ID of the wallet that initiated the transaction.
   */
  wallet_id: string;
}

export namespace TransactionStillPendingWebhookPayload {
  /**
   * The original transaction request that is still pending.
   */
  export interface TransactionRequest {
    authorization_list?: Array<TransactionRequest.AuthorizationList>;

    chain_id?: string | number;

    data?: string;

    from?: string;

    gas_limit?: string | number;

    gas_price?: string | number;

    max_fee_per_gas?: string | number;

    max_priority_fee_per_gas?: string | number;

    nonce?: string | number;

    to?: string;

    type?: 0 | 1 | 2 | 4;

    value?: string | number;
  }

  export namespace TransactionRequest {
    export interface AuthorizationList {
      chain_id: string | number;

      contract: string;

      nonce: string | number;

      r: string;

      s: string;

      y_parity: number;
    }
  }
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
    | FundsDepositedWebhookPayload.UnionMember0
    | FundsDepositedWebhookPayload.UnionMember1
    | FundsDepositedWebhookPayload.UnionMember2
    | FundsDepositedWebhookPayload.UnionMember3
    | FundsDepositedWebhookPayload.UnionMember4
    | FundsDepositedWebhookPayload.UnionMember5;

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

  export interface UnionMember0 {
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

  export interface UnionMember1 {
    drain_id: string;

    liquidation_address_id: string;

    method: 'liquidation_address';

    /**
     * The original deposit transaction hash that triggered the failed drain.
     */
    original_transaction_hash: string;

    type: 'refund';
  }

  export interface UnionMember2 {
    activity_id: string;

    method: 'virtual_account';

    type: 'fiat_deposit';

    virtual_account_id: string;
  }

  export interface UnionMember3 {
    method: 'transfer';

    /**
     * The wallet address that sent the transfer.
     */
    source_wallet_address: string;

    transfer_id: string;

    type: 'crypto_deposit';
  }

  export interface UnionMember4 {
    method: 'transfer';

    transfer_id: string;

    type: 'fiat_deposit';
  }

  export interface UnionMember5 {
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
 * Payload for the kraken_embed.verification_completed webhook event.
 */
export interface KrakenEmbedVerificationCompletedWebhookPayload {
  /**
   * ISO 8601 timestamp of when verification completed.
   */
  completed_at: string;

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.verification_completed';

  /**
   * The ID of the user.
   */
  user_id: string;
}

/**
 * Payload for the kraken_embed.verification_failed webhook event.
 */
export interface KrakenEmbedVerificationFailedWebhookPayload {
  /**
   * ISO 8601 timestamp of when verification failed.
   */
  failed_at: string;

  /**
   * The reason for the failure.
   */
  failure_reason: 'timeout' | 'api_error' | 'disabled_or_closed';

  /**
   * The type of webhook event.
   */
  type: 'kraken_embed.verification_failed';

  /**
   * The ID of the user.
   */
  user_id: string;

  /**
   * The user's status at the time of failure.
   */
  status?:
    | KrakenEmbedVerificationFailedWebhookPayload.UnionMember0
    | KrakenEmbedVerificationFailedWebhookPayload.UnionMember1
    | KrakenEmbedVerificationFailedWebhookPayload.UnionMember2;
}

export namespace KrakenEmbedVerificationFailedWebhookPayload {
  export interface UnionMember0 {
    required_actions: Array<
      UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2
    >;

    state: 'ok';
  }

  export namespace UnionMember0 {
    export interface UnionMember0 {
      action_type: 'verification';

      deadline: string | null;

      reasons: Array<string>;

      verification_type:
        | 'identity'
        | 'residence'
        | 'selfie'
        | 'sanctions_check'
        | 'pep_check'
        | 'negative_news_check'
        | 'tax_id';
    }

    export interface UnionMember1 {
      action_type: 'provide_details';

      deadline: string | null;

      details_type:
        | UnionMember1.UnionMember0
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type;

      reason: string | null;
    }

    export namespace UnionMember1 {
      export interface UnionMember0 {
        type: 'terms_of_service';

        version?: number;
      }

      export interface Type {
        type: 'full_name';
      }

      export interface Type {
        type: 'date_of_birth';
      }

      export interface Type {
        type: 'city_of_birth';
      }

      export interface Type {
        type: 'country_of_birth';
      }

      export interface Type {
        type: 'nationalities';
      }

      export interface Type {
        type: 'residence';
      }

      export interface Type {
        type: 'phone';
      }

      export interface Type {
        type: 'occupation';
      }

      export interface Type {
        type: 'employer';
      }

      export interface Type {
        type: 'tax_ids';
      }

      export interface Type {
        type: 'client_identifier';
      }
    }

    export interface UnionMember2 {
      action_type: 'wait';

      wait_reason_code: string;
    }
  }

  export interface UnionMember1 {
    reasons: Array<string>;

    required_actions: Array<
      UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2
    >;

    state: 'disabled';
  }

  export namespace UnionMember1 {
    export interface UnionMember0 {
      action_type: 'verification';

      deadline: string | null;

      reasons: Array<string>;

      verification_type:
        | 'identity'
        | 'residence'
        | 'selfie'
        | 'sanctions_check'
        | 'pep_check'
        | 'negative_news_check'
        | 'tax_id';
    }

    export interface UnionMember1 {
      action_type: 'provide_details';

      deadline: string | null;

      details_type:
        | UnionMember1.UnionMember0
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type
        | UnionMember1.Type;

      reason: string | null;
    }

    export namespace UnionMember1 {
      export interface UnionMember0 {
        type: 'terms_of_service';

        version?: number;
      }

      export interface Type {
        type: 'full_name';
      }

      export interface Type {
        type: 'date_of_birth';
      }

      export interface Type {
        type: 'city_of_birth';
      }

      export interface Type {
        type: 'country_of_birth';
      }

      export interface Type {
        type: 'nationalities';
      }

      export interface Type {
        type: 'residence';
      }

      export interface Type {
        type: 'phone';
      }

      export interface Type {
        type: 'occupation';
      }

      export interface Type {
        type: 'employer';
      }

      export interface Type {
        type: 'tax_ids';
      }

      export interface Type {
        type: 'client_identifier';
      }
    }

    export interface UnionMember2 {
      action_type: 'wait';

      wait_reason_code: string;
    }
  }

  export interface UnionMember2 {
    reasons: Array<string>;

    state: 'closed';
  }
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

export declare namespace Webhooks {
  export {
    type UserCreatedWebhookPayload as UserCreatedWebhookPayload,
    type UserAuthenticatedWebhookPayload as UserAuthenticatedWebhookPayload,
    type UserLinkedAccountWebhookPayload as UserLinkedAccountWebhookPayload,
    type UserUnlinkedAccountWebhookPayload as UserUnlinkedAccountWebhookPayload,
    type UserUpdatedAccountWebhookPayload as UserUpdatedAccountWebhookPayload,
    type UserTransferredAccountWebhookPayload as UserTransferredAccountWebhookPayload,
    type UserWalletCreatedWebhookPayload as UserWalletCreatedWebhookPayload,
    type TransactionBroadcastedWebhookPayload as TransactionBroadcastedWebhookPayload,
    type TransactionConfirmedWebhookPayload as TransactionConfirmedWebhookPayload,
    type TransactionExecutionRevertedWebhookPayload as TransactionExecutionRevertedWebhookPayload,
    type TransactionStillPendingWebhookPayload as TransactionStillPendingWebhookPayload,
    type TransactionFailedWebhookPayload as TransactionFailedWebhookPayload,
    type TransactionReplacedWebhookPayload as TransactionReplacedWebhookPayload,
    type TransactionProviderErrorWebhookPayload as TransactionProviderErrorWebhookPayload,
    type FundsDepositedWebhookPayload as FundsDepositedWebhookPayload,
    type FundsWithdrawnWebhookPayload as FundsWithdrawnWebhookPayload,
    type PrivateKeyExportWebhookPayload as PrivateKeyExportWebhookPayload,
    type WalletRecoverySetupWebhookPayload as WalletRecoverySetupWebhookPayload,
    type WalletRecoveredWebhookPayload as WalletRecoveredWebhookPayload,
    type MfaEnabledWebhookPayload as MfaEnabledWebhookPayload,
    type MfaDisabledWebhookPayload as MfaDisabledWebhookPayload,
    type KrakenEmbedVerificationCompletedWebhookPayload as KrakenEmbedVerificationCompletedWebhookPayload,
    type KrakenEmbedVerificationFailedWebhookPayload as KrakenEmbedVerificationFailedWebhookPayload,
    type KrakenEmbedQuoteExecutedWebhookPayload as KrakenEmbedQuoteExecutedWebhookPayload,
  };
}
