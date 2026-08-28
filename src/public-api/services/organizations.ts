import { PrivyAPI } from '../../client';
import { Organizations } from '../../resources/organizations/organizations';

export class PrivyOrganizationsService extends Organizations {
  constructor(privyApiClient: PrivyAPI) {
    super(privyApiClient);
  }
}
