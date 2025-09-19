import * as jose from 'jose';
import { APP_TEST_ACCOUNT, JWT_AUTH, TEST_APP } from '../integration/test-config';

export async function generateTestJWT(subject: string = JWT_AUTH.subject) {
  const key = await jose.importPKCS8(JWT_AUTH.sk, 'RS256');
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setSubject(subject)
    .setExpirationTime('1h')
    .sign(key);

  return jwt;
}

export async function generatePrivyJWT() {
  const response = await fetch(`${TEST_APP.apiUrl.replace('api', 'auth')}/api/v1/passwordless/authenticate`, {
    body: JSON.stringify({
      email: APP_TEST_ACCOUNT.email,
      code: APP_TEST_ACCOUNT.otp,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'privy-app-id': TEST_APP.id,
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
