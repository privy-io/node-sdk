import { PrivyAPI } from '../../client';
import { PrivyClient } from '../PrivyClient';
import { PrivyAuthUtils } from './utils/auth';
import { PrivyRequestFormatter } from './utils/request-formatter';
import { PrivyRequestSigner } from './utils/request-signer';

export class PrivyUtils {
  private _requestSigner: PrivyRequestSigner;
  private _requestFormatter: PrivyRequestFormatter;
  private _auth: PrivyAuthUtils;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    this._requestSigner = new PrivyRequestSigner(privyClient);
    this._requestFormatter = new PrivyRequestFormatter();
    this._auth = new PrivyAuthUtils(privyApiClient);
  }

  public requestSigner(): PrivyRequestSigner {
    return this._requestSigner;
  }

  public requestFormatter(): PrivyRequestFormatter {
    return this._requestFormatter;
  }

  public auth(): PrivyAuthUtils {
    return this._auth;
  }
}
