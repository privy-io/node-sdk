// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntentsAPI from './intents';

export class Intents extends APIResource {}

/**
 * A leaf member (user or key) of a nested key quorum in an intent authorization.
 */
export type IntentAuthorizationKeyQuorumMember =
  | IntentAuthorizationKeyQuorumMember.UserMember
  | IntentAuthorizationKeyQuorumMember.KeyMember;

export namespace IntentAuthorizationKeyQuorumMember {
  export interface UserMember {
    /**
     * Whether this member has signed the intent
     */
    has_signed: boolean;

    type: 'user';

    /**
     * User ID of the key quorum member
     */
    user_id: string;

    /**
     * Display name for the user (email, etc)
     */
    display_name?: string;
  }

  export interface KeyMember {
    /**
     * Whether this key has signed the intent
     */
    has_signed: boolean;

    /**
     * Public key of the key quorum member
     */
    public_key: string;

    type: 'key';

    /**
     * Display name for the key (if any)
     */
    display_name?: string;
  }
}

/**
 * A member of an intent authorization quorum. Can be a user, key, or nested key
 * quorum.
 */
export type IntentAuthorizationMember =
  | IntentAuthorizationMember.UserMember
  | IntentAuthorizationMember.KeyMember
  | IntentAuthorizationMember.KeyQuorumMember;

export namespace IntentAuthorizationMember {
  export interface UserMember {
    /**
     * Whether this member has signed the intent
     */
    has_signed: boolean;

    type: 'user';

    /**
     * User ID of the key quorum member
     */
    user_id: string;

    /**
     * Display name for the user (email, etc)
     */
    display_name?: string;
  }

  export interface KeyMember {
    /**
     * Whether this key has signed the intent
     */
    has_signed: boolean;

    /**
     * Public key of the key quorum member
     */
    public_key: string;

    type: 'key';

    /**
     * Display name for the key (if any)
     */
    display_name?: string;
  }

  export interface KeyQuorumMember {
    /**
     * Whether this child key quorum has fulfilled its threshold
     */
    has_signed: boolean;

    /**
     * ID of the child key quorum member
     */
    key_quorum_id: string;

    /**
     * Members of this child quorum
     */
    members: Array<IntentsAPI.IntentAuthorizationKeyQuorumMember>;

    /**
     * Number of signatures required from this child quorum
     */
    threshold: number;

    type: 'key_quorum';

    /**
     * Display name for the child key quorum (if any)
     */
    display_name?: string;
  }
}

export declare namespace Intents {
  export {
    type IntentAuthorizationKeyQuorumMember as IntentAuthorizationKeyQuorumMember,
    type IntentAuthorizationMember as IntentAuthorizationMember,
  };
}
