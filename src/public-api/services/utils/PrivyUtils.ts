import { PrivyRequestFormatter } from './PrivyRequestFormatter';
import { PrivyRequestSigner } from './PrivyRequestSigner';

export class PrivyUtils {
  private _requestSigner: PrivyRequestSigner;
  private _requestFormatter: PrivyRequestFormatter;

  constructor(requestSigner: PrivyRequestSigner, requestFormatter: PrivyRequestFormatter) {
    this._requestSigner = requestSigner;
    this._requestFormatter = requestFormatter;
  }

  public requestSigner(): PrivyRequestSigner {
    return this._requestSigner;
  }

  public requestFormatter(): PrivyRequestFormatter {
    return this._requestFormatter;
  }
}
