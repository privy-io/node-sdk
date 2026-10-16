import { parseUserFromIdentityTokenPayload } from '@privy-io/node/lib/identity-token';

function payloadWithLinkedAccounts(linkedAccounts: unknown[]) {
  return {
    sub: 'did:privy:user',
    cr: '1700000000',
    linked_accounts: JSON.stringify(linkedAccounts),
  };
}

const embeddedWallet = {
  type: 'wallet',
  wallet_client_type: 'privy',
  id: 'wallet-id',
  address: '0x0000000000000000000000000000000000000001',
  chain_type: 'ethereum',
  lv: 1700000000,
};

describe('parseUserFromIdentityTokenPayload', () => {
  it('defaults user_can_sign to true for embedded wallets when absent', () => {
    const user = parseUserFromIdentityTokenPayload(payloadWithLinkedAccounts([embeddedWallet]));

    expect(user.linked_accounts).toHaveLength(1);
    expect(user.linked_accounts[0]).toMatchObject({ type: 'wallet', user_can_sign: true });
  });

  it('passes through user_can_sign for embedded wallets when present', () => {
    const user = parseUserFromIdentityTokenPayload(
      payloadWithLinkedAccounts([{ ...embeddedWallet, user_can_sign: false }]),
    );

    expect(user.linked_accounts[0]).toMatchObject({ type: 'wallet', user_can_sign: false });
  });
});
