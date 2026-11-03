import { countAuthorizationSignatures } from '@privy-io/node/lib/authorization';

describe('countAuthorizationSignatures', () => {
  it('counts every source of signatures', () => {
    expect(
      countAuthorizationSignatures({
        signatures: ['signature'],
        authorization_private_keys: ['private-key-1', 'private-key-2'],
        user_jwts: ['jwt-1'],
        user_auth: [{ user_jwt: 'jwt-2', mfa_token: 'mfa-token' }],
        sign_fns: [async () => 'signature'],
      }),
    ).toBe(6);
  });

  it('counts a JWT given in both user_jwts and user_auth once', () => {
    expect(
      countAuthorizationSignatures({
        user_jwts: ['jwt'],
        user_auth: [{ user_jwt: 'jwt', mfa_token: 'mfa-token' }],
      }),
    ).toBe(1);
  });

  it('counts an empty authorization context as zero', () => {
    expect(countAuthorizationSignatures({})).toBe(0);
  });
});
