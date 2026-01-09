import type { Hex } from 'viem';

export const TEST_APP = {
  id: process.env['TEST_APP_ID'] ?? 'cm8osegv00004r13y7500o2yz',
  secret: process.env['TEST_APP_SECRET']!,
  apiUrl: process.env['TEST_API_URL'] ?? 'https://privy-git-taabish-test-always-retry.privy-preview.app/api',
};

// Details of the custom auth JWT used for resource ownership
export const JWT_AUTH = {
  subject: process.env['JWT_AUTH_SUBJECT'] ?? 'java-sdk-sub-id',
  sk: process.env['JWT_AUTH_SK']!,
};

// Details of the P256 keypair used for resource ownership
export const P256_KEYPAIR = {
  publicKey:
    process.env['P256_PUBLIC_KEY'] ??
    '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEa5jMhtY21SfkzLngf+ifv4mKKc/UD4u81qHWUoD1C6FW7YHP2MRH+am+HKzGPdOCqrxKnMRix6oJ9Y+xhGKihQ==\n-----END PUBLIC KEY-----',
  privateKey: process.env['P256_PRIVATE_KEY']!,
};

// Wallets
export const OWNERLESS_ETHEREUM_WALLET = {
  id: process.env['OWNERLESS_ETHEREUM_WALLET_ID'] ?? 'ihdp5ibevmv4g76rd1yamqbk',
  address:
    (process.env['OWNERLESS_ETHEREUM_WALLET_ADDRESS'] as Hex) ?? '0xdEC974489c102b2C937c1CF060B94B43085Ca95a',
};
export const P256_OWNED_ETHEREUM_WALLET = {
  id: process.env['P256_OWNED_ETHEREUM_WALLET_ID'] ?? 'f8j2aq0ei43bdhi4we4ogd5p',
  address:
    (process.env['P256_OWNED_ETHEREUM_WALLET_ADDRESS'] as Hex) ??
    '0x69DfF286C9348f4b2509C6353235b59a45d798dA',
};
export const USER_OWNED_ETHEREUM_WALLET = {
  id: process.env['USER_OWNED_ETHEREUM_WALLET_ID'] ?? 'xdeor1731y8gme1utsldxynv',
  address:
    (process.env['USER_OWNED_ETHEREUM_WALLET_ADDRESS'] as Hex) ??
    '0xd606c61A275328395E15375A0139Ef92DA9cC280',
};

export const OWNERLESS_SOLANA_WALLET = {
  id: process.env['OWNERLESS_SOLANA_WALLET_ID'] ?? 'trcvz56r05sis3r1ekkwt9ac',
  address: process.env['OWNERLESS_SOLANA_WALLET_ADDRESS'] ?? 'C5fc2b5oD8VbGUzaep8GQzQ8ghWPeBy3BVLC8yqCAK3Y',
};
export const P256_OWNED_SOLANA_WALLET = {
  id: process.env['P256_OWNED_SOLANA_WALLET_ID'] ?? 'mny5cmwnz343il5r64bchvi5',
  address: process.env['P256_OWNED_SOLANA_WALLET_ADDRESS'] ?? '2n1oXAmSb3khrxL7iyWnbuD2gL14Hq4V9FYPYWyougbe',
};
export const USER_OWNED_SOLANA_WALLET = {
  id: process.env['USER_OWNED_SOLANA_WALLET_ID'] ?? 'av73ge0tfe2xqborg9vjushr',
  address: process.env['USER_OWNED_SOLANA_WALLET_ADDRESS'] ?? 'DTeASnDsQ1z9Le77MjuiPH4MyqLDWa9vB6R3ZZKRd8d3',
};

export const OWNERLESS_TRON_WALLET = {
  id: process.env['OWNERLESS_TRON_WALLET_ID'] ?? 'z6s6lbfnjvp5to4vhgo7i50g',
  address: process.env['OWNERLESS_TRON_WALLET_ADDRESS'] ?? 'TX4RmePYBV1YTSkZECcT4iMNag9kXykiNj',
  pk:
    process.env['OWNERLESS_TRON_WALLET_PK'] ??
    '03ccf1f079b561a885d0ab008820fe9493f85250b2d5ccd644abf6a0c05bafb32a',
};
export const P256_OWNED_TRON_WALLET = {
  id: process.env['P256_OWNED_TRON_WALLET_ID'] ?? 'u6dkalq4b15486iyfmqqs0sz',
  address: process.env['P256_OWNED_TRON_WALLET_ADDRESS'] ?? 'TXMqxTc8QeGkTMBYpddptMbETTxF9qeUru',
  pk:
    process.env['P256_OWNED_TRON_WALLET_PK'] ??
    '038a225d2debd5abf0cafc2ce51850243a1943eb92758413505f9339423d7371f0',
};

// Test account details
export const APP_TEST_ACCOUNT = {
  email: process.env['TEST_APP_TEST_ACCOUNT_EMAIL'] ?? 'test-8312@privy.io',
  otp: process.env['TEST_APP_TEST_ACCOUNT_OTP']!,
};
