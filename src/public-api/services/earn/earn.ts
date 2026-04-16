import { PrivyAPI } from '../../../client';
import { Earn } from '../../../resources/wallets/earn/earn';
import { PrivyClient } from '../../PrivyClient';
import { PrivyEarnEthereumService } from './ethereum';

export class PrivyEarnService extends Earn {
  private ethereumService: PrivyEarnEthereumService;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.ethereumService = new PrivyEarnEthereumService(privyApiClient, privyClient);
  }

  public ethereum(): PrivyEarnEthereumService {
    return this.ethereumService;
  }
}
