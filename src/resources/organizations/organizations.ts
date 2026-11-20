// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SharedAPI from '../shared';
import * as ExternalFiatAccountsAPI from './external-fiat-accounts';
import {
  ExternalFiatAccountCreateParams,
  ExternalFiatAccountDeleteParams,
  ExternalFiatAccountGetParams,
  ExternalFiatAccountListParams,
  ExternalFiatAccounts,
} from './external-fiat-accounts';
import * as KYBAPI from './kyb';
import { KYB, KYBInitiateLinksParams, KYBInitiateTosParams, KYBSubmitParams } from './kyb';
import * as WalletsAPI from '../wallets/wallets';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to organizations
 */
export class Organizations extends APIResource {
  externalFiatAccounts: ExternalFiatAccountsAPI.ExternalFiatAccounts =
    new ExternalFiatAccountsAPI.ExternalFiatAccounts(this._client);
  kyb: KYBAPI.KYB = new KYBAPI.KYB(this._client);

  /**
   * Create an organization in an app.
   *
   * @example
   * ```ts
   * const organization = await client.organizations.create({
   *   default_key_quorum_id: 'string',
   *   display_name: 'x',
   * });
   * ```
   */
  create(body: OrganizationCreateParams, options?: RequestOptions): APIPromise<Organization> {
    return this._client.post('/v1/organizations', { body, ...options });
  }

  /**
   * Update an organization by ID.
   *
   * @example
   * ```ts
   * const organization = await client.organizations.update(
   *   'organization_id',
   * );
   * ```
   */
  update(
    organizationID: string,
    body: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Organization> {
    return this._client.patch(path`/v1/organizations/${organizationID}`, { body, ...options });
  }

  /**
   * List organizations in an app.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const organization of client.organizations.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OrganizationsCursor, Organization> {
    return this._client.getAPIList('/v1/organizations', Cursor<Organization>, { query, ...options });
  }

  /**
   * Delete an organization by ID.
   *
   * @example
   * ```ts
   * await client.organizations.delete('organization_id');
   * ```
   */
  delete(organizationID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/organizations/${organizationID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get an organization by ID.
   *
   * @example
   * ```ts
   * const organization = await client.organizations.get(
   *   'organization_id',
   * );
   * ```
   */
  get(organizationID: string, options?: RequestOptions): APIPromise<Organization> {
    return this._client.get(path`/v1/organizations/${organizationID}`, options);
  }
}

export type OrganizationsCursor = Cursor<Organization>;

/**
 * A Privy organization object.
 */
export interface Organization {
  /**
   * Unique organization identifier
   */
  id: string;

  /**
   * Unix timestamp when the organization was created
   */
  created_at: number;

  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id: SharedAPI.KeyQuorumID;

  /**
   * Defaults applied to wallets created with the organization as their entity, keyed
   * by chain type.
   */
  default_wallet_configurations: OrganizationDefaultWalletConfigurations;

  /**
   * Organization display name
   */
  display_name: string;

  /**
   * Unix timestamp when the organization was last updated
   */
  updated_at: number;
}

/**
 * Request body for creating an organization.
 */
export interface OrganizationCreateRequestBody {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id: SharedAPI.KeyQuorumID;

  display_name: string;

  /**
   * Defaults applied to wallets created with the organization as their entity, keyed
   * by chain type.
   */
  default_wallet_configurations?: OrganizationDefaultWalletConfigurations;
}

/**
 * Defaults applied to wallets created with the organization as their entity, keyed
 * by chain type.
 */
export interface OrganizationDefaultWalletConfigurations {
  /**
   * Default policies and additional signers for wallets of one chain type.
   */
  ethereum?: OrganizationWalletConfiguration;

  /**
   * Default policies and additional signers for wallets of one chain type.
   */
  solana?: OrganizationWalletConfiguration;

  /**
   * Default policies and additional signers for wallets of one chain type.
   */
  tron?: OrganizationWalletConfiguration;

  [k: string]: OrganizationWalletConfiguration | undefined;
}

/**
 * Changes to the defaults, keyed by chain type. Omitted chains and fields are
 * unchanged, and `null` removes a chain.
 */
export interface OrganizationDefaultWalletConfigurationsUpdate {
  /**
   * Default policies and additional signers for wallets of one chain type.
   */
  ethereum?: OrganizationWalletConfiguration | null;

  /**
   * Default policies and additional signers for wallets of one chain type.
   */
  solana?: OrganizationWalletConfiguration | null;

  /**
   * Default policies and additional signers for wallets of one chain type.
   */
  tron?: OrganizationWalletConfiguration | null;

  [k: string]: OrganizationWalletConfiguration | null | undefined;
}

/**
 * Request body for updating an organization.
 */
export interface OrganizationUpdateRequestBody {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id?: SharedAPI.KeyQuorumID;

  /**
   * Changes to the defaults, keyed by chain type. Omitted chains and fields are
   * unchanged, and `null` removes a chain.
   */
  default_wallet_configurations?: OrganizationDefaultWalletConfigurationsUpdate;

  display_name?: string;
}

/**
 * Default policies and additional signers for wallets of one chain type.
 */
export interface OrganizationWalletConfiguration {
  /**
   * Additional signers for the wallet.
   */
  additional_signers?: WalletsAPI.AdditionalSignerInput;

  /**
   * An optional list of up to one policy ID to enforce on the wallet.
   */
  policy_ids?: WalletsAPI.PolicyInput;
}

/**
 * Response returned when listing organizations for an app.
 */
export interface OrganizationsListResponse {
  /**
   * Items in this page.
   */
  data: Array<Organization>;

  /**
   * Cursor for the next page. Null when there are no further pages.
   */
  next_cursor: string | null;
}

export interface OrganizationCreateParams {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id: SharedAPI.KeyQuorumID;

  display_name: string;

  /**
   * Defaults applied to wallets created with the organization as their entity, keyed
   * by chain type.
   */
  default_wallet_configurations?: OrganizationDefaultWalletConfigurations;
}

export interface OrganizationUpdateParams {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id?: SharedAPI.KeyQuorumID;

  /**
   * Changes to the defaults, keyed by chain type. Omitted chains and fields are
   * unchanged, and `null` removes a chain.
   */
  default_wallet_configurations?: OrganizationDefaultWalletConfigurationsUpdate;

  display_name?: string;
}

export interface OrganizationListParams extends CursorParams {}

Organizations.ExternalFiatAccounts = ExternalFiatAccounts;
Organizations.KYB = KYB;

export declare namespace Organizations {
  export {
    type Organization as Organization,
    type OrganizationCreateRequestBody as OrganizationCreateRequestBody,
    type OrganizationDefaultWalletConfigurations as OrganizationDefaultWalletConfigurations,
    type OrganizationDefaultWalletConfigurationsUpdate as OrganizationDefaultWalletConfigurationsUpdate,
    type OrganizationUpdateRequestBody as OrganizationUpdateRequestBody,
    type OrganizationWalletConfiguration as OrganizationWalletConfiguration,
    type OrganizationsListResponse as OrganizationsListResponse,
    type OrganizationsCursor as OrganizationsCursor,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
  };

  export {
    ExternalFiatAccounts as ExternalFiatAccounts,
    type ExternalFiatAccountCreateParams as ExternalFiatAccountCreateParams,
    type ExternalFiatAccountListParams as ExternalFiatAccountListParams,
    type ExternalFiatAccountDeleteParams as ExternalFiatAccountDeleteParams,
    type ExternalFiatAccountGetParams as ExternalFiatAccountGetParams,
  };

  export {
    KYB as KYB,
    type KYBInitiateLinksParams as KYBInitiateLinksParams,
    type KYBInitiateTosParams as KYBInitiateTosParams,
    type KYBSubmitParams as KYBSubmitParams,
  };
}
