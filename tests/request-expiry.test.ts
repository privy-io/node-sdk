import { PrivyClient } from '../src/public-api/PrivyClient';

describe('request expiry opt-out', () => {
  it('getRequestExpiry returns undefined when disabled', () => {
    const client = new PrivyClient({
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      disableRequestExpiry: true,
    });
    expect(client.getRequestExpiry()).toBeUndefined();
  });

  it('getRequestExpiry returns a number by default', () => {
    const client = new PrivyClient({
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
    });
    const expiry = client.getRequestExpiry();
    expect(typeof expiry).toBe('number');
    expect(expiry).toBeGreaterThan(Date.now());
  });

  it('getRequestExpiry returns a number when explicitly not disabled', () => {
    const client = new PrivyClient({
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      disableRequestExpiry: false,
    });
    const expiry = client.getRequestExpiry();
    expect(typeof expiry).toBe('number');
  });

  it('disableRequestExpiry supersedes defaultRequestExpiryMs', () => {
    const client = new PrivyClient({
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      defaultRequestExpiryMs: 30 * 60 * 1000,
      disableRequestExpiry: true,
    });
    expect(client.getRequestExpiry()).toBeUndefined();
  });
});
