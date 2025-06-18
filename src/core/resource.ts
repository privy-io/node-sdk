// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { PrivyAPI } from '../client';

export abstract class APIResource {
  protected _client: PrivyAPI;

  constructor(client: PrivyAPI) {
    this._client = client;
  }
}
