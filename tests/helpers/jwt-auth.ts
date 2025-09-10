import * as jose from 'jose';

const JWT_AUTH_SUBJECT = process.env['JWT_AUTH_SUBJECT']!;
const JWT_AUTH_SK = process.env['JWT_AUTH_SK']!;

export async function generateTestJWT(subject: string = JWT_AUTH_SUBJECT) {
  const key = await jose.importPKCS8(JWT_AUTH_SK, 'RS256');
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setSubject(subject)
    .setExpirationTime('1h')
    .sign(key);

  return jwt;
}

export async function generatePrivyJWT() {
  const TEST_API_URL = process.env['TEST_API_URL']!;
  const TEST_APP_ID = process.env['TEST_APP_ID']!;
  const TEST_APP_TEST_ACCOUNT_EMAIL = process.env['TEST_APP_TEST_ACCOUNT_EMAIL']!;
  const TEST_APP_TEST_ACCOUNT_OTP = process.env['TEST_APP_TEST_ACCOUNT_OTP']!;

  const response = await fetch(`${TEST_API_URL.replace('api', 'auth')}/api/v1/passwordless/authenticate`, {
    body: JSON.stringify({
      email: TEST_APP_TEST_ACCOUNT_EMAIL,
      code: TEST_APP_TEST_ACCOUNT_OTP,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'privy-app-id': TEST_APP_ID,
      // Fake the origin to avoid origin checks
      Origin: 'http://localhost:3000',
    },
  });
  if (response.status !== 200) {
    throw new Error(
      `Failed to generate Privy JWT: ${response.status} ${response.statusText} ${await response.text()}`,
    );
  }

  const body = (await response.json()) as { token: string };

  return body.token;
}
