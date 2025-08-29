import { PrivyRequestSigner } from './PrivyRequestSigner';

export class PrivyUtils {
  private _requestSigner: PrivyRequestSigner;

  constructor(requestSigner: PrivyRequestSigner) {
    this._requestSigner = requestSigner;
  }

  public requestSigner(): PrivyRequestSigner {
    return this._requestSigner;
  }
}
