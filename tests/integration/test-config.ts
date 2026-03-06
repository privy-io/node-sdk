export const TEST_APP = {
  id: process.env['TEST_APP_ID'] ?? 'cm8osegv00004r13y7500o2yz',
  secret: process.env['TEST_APP_SECRET']!,
  apiUrl: process.env['TEST_API_URL'] ?? 'https://api.staging.privy.io',
};

// Details of the custom auth JWT used for resource ownership
export const JWT_AUTH = {
  subject: process.env['JWT_AUTH_SUBJECT'] ?? 'java-sdk-sub-id',
  sk: process.env['JWT_AUTH_SK']!,
};

// Test account details
export const APP_TEST_ACCOUNT = {
  email: process.env['TEST_APP_TEST_ACCOUNT_EMAIL'] ?? 'test-8312@privy.io',
  otp: process.env['TEST_APP_TEST_ACCOUNT_OTP']!,
};
