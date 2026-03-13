// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class WalletActions extends APIResource {}

/**
 * Type of wallet action
 */
export type WalletActionType = 'swap';

/**
 * Status of a wallet action.
 */
export type WalletActionStatus = 'pending' | 'succeeded' | 'rejected' | 'failed';

/**
 * Type of a wallet action step.
 */
export type WalletActionStepType = 'evm_transaction' | 'evm_user_operation';

/**
 * Status of an EVM step in a wallet action.
 */
export type EvmWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'retrying'
  | 'confirmed'
  | 'rejected'
  | 'reverted'
  | 'replaced'
  | 'abandoned';

/**
 * A wallet action step consisting of an EVM transaction.
 */
export interface EvmTransactionWalletActionStep {
  /**
   * CAIP-2 chain identifier of the transaction, containing the chain ID.
   */
  caip2: string;

  /**
   * Status of an EVM step in a wallet action.
   */
  status: EvmWalletActionStepStatus;

  /**
   * The transaction hash for this step. May change while the step status is
   * non-terminal.
   */
  transaction_hash: string | null;

  type: 'evm_transaction';

  /**
   * If in a failed terminal state, provides context.
   */
  failure_reason?: EvmTransactionWalletActionStep.FailureReason;
}

export namespace EvmTransactionWalletActionStep {
  /**
   * If in a failed terminal state, provides context.
   */
  export interface FailureReason {
    /**
     * Human-readable message.
     */
    message: string;

    /**
     * Error details, if available.
     */
    details?: unknown;
  }
}

/**
 * A wallet action step consisting of an EVM user operation.
 */
export interface EvmUserOperationWalletActionStep {
  /**
   * Transaction hash of the bundle in which this user operation was included. Null
   * until included by a bundler.
   */
  bundle_transaction_hash: string | null;

  /**
   * CAIP-2 network identifier, containing the chain ID of the user operation.
   */
  caip2: string;

  /**
   * The entrypoint version of the user operation.
   */
  entrypoint_version: '0.6' | '0.7' | '0.8' | '0.9';

  /**
   * Status of an EVM step in a wallet action.
   */
  status: EvmWalletActionStepStatus;

  type: 'evm_user_operation';

  /**
   * The user operation hash for this step. May change while the step status is
   * non-terminal.
   */
  user_operation_hash: string | null;

  /**
   * If in a failed terminal state, provides context.
   */
  failure_reason?: EvmUserOperationWalletActionStep.FailureReason;
}

export namespace EvmUserOperationWalletActionStep {
  /**
   * If in a failed terminal state, provides context.
   */
  export interface FailureReason {
    /**
     * Human-readable message.
     */
    message: string;

    /**
     * Error details, if available.
     */
    details?: unknown;
  }
}

/**
 * A step within a wallet action, representing a single onchain action.
 */
export type WalletActionStep = EvmTransactionWalletActionStep | EvmUserOperationWalletActionStep;

export declare namespace WalletActions {
  export {
    type WalletActionType as WalletActionType,
    type WalletActionStatus as WalletActionStatus,
    type WalletActionStepType as WalletActionStepType,
    type EvmWalletActionStepStatus as EvmWalletActionStepStatus,
    type EvmTransactionWalletActionStep as EvmTransactionWalletActionStep,
    type EvmUserOperationWalletActionStep as EvmUserOperationWalletActionStep,
    type WalletActionStep as WalletActionStep,
  };
}
