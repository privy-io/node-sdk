import { PrivyClient } from 'privy-api-client/public-api/PrivyClient';

describe('PrivyPoliciesService', () => {
  // Read the required environment variables from .env
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_SECRET = process.env['TEST_APP_SECRET']!;
  const TEST_API_URL = process.env['TEST_API_URL']!;

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP_ID,
      appSecret: TEST_APP_SECRET,
      apiUrl: TEST_API_URL,
    });
  });
  describe.skip('create', () => {
    it('should create a policy', async () => {
      const policy = await privyClient.policies().create({
        version: '1.0',
        name: 'Native token transfer maximums',
        chain_type: 'ethereum',
        rules: [
          {
            name: 'Restrict ETH transfers to a maximum value',
            method: 'eth_sendTransaction',
            conditions: [
              {
                field_source: 'ethereum_transaction',
                field: 'value',
                operator: 'lte',
                value: '0x2386F26FC10000',
              },
            ],
            action: 'ALLOW',
          },
        ],
      });

      expect(policy.id).toBeDefined();
      expect(policy.name).toBe('Native token transfer maximums');
      expect(policy.chain_type).toBe('ethereum');
      expect(policy.rules).toEqual([
        expect.objectContaining({
          name: 'Restrict ETH transfers to a maximum value',
          method: 'eth_sendTransaction',
        }),
      ]);
    });
  });
});
