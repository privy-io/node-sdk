import { PrivyAPI } from '../../client';
import { Wallets } from '../../resources';
import { PrivyEthereumService } from './ethereum';

export class PrivyWalletsService extends Wallets {
  private ethereumService: PrivyEthereumService;

  constructor(privyApiClient: PrivyAPI) {
    super(privyApiClient);
    this.ethereumService = new PrivyEthereumService(this);
  }

  public ethereum(): PrivyEthereumService {
    return this.ethereumService;
  }
}
