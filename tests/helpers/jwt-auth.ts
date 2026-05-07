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

const JWT_RATE_LIMIT_MAX_ATTEMPTS = 4;
const JWT_RATE_LIMIT_MAX_WAIT_MS = 15_000;

export async function generatePrivyJWT() {
  const url = `${TEST_APP.apiUrl.replace('api', 'auth')}/api/v1/passwordless/authenticate`;
  const init: RequestInit = {
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
  };

  let response: Response | undefined;
  for (let attempt = 0; attempt < JWT_RATE_LIMIT_MAX_ATTEMPTS; attempt++) {
    response = await fetch(url, init);
    if (response.status !== 429) break;

    const waitMs = waitMsFromRateLimitReset(response.headers.get('X-RateLimit-Reset'), attempt);
    // Drain the body so the connection can be released before we sleep.
    await response.text().catch(() => undefined);
    if (attempt < JWT_RATE_LIMIT_MAX_ATTEMPTS - 1) {
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }

  if (!response || response.status !== 200) {
    const status = response?.status ?? 'no response';
    const statusText = response?.statusText ?? '';
    const body = response ? await response.text().catch(() => '') : '';
    throw new Error(`Failed to generate Privy JWT: ${status} ${statusText} ${body}`);
  }

  const body = (await response.json()) as { token: string };

  return body.token;
}

/**
 * Compute how long to wait before retrying after a 429.
 *
 * The Privy API returns `X-RateLimit-Reset` — accept it either as an absolute
 * unix-seconds timestamp or as seconds-until-reset, and clamp to a sane range
 * so a malformed header can't stall the suite. Falls back to exponential
 * backoff if the header is missing or unparseable.
 */
function waitMsFromRateLimitReset(headerValue: string | null, attempt: number): number {
  const parsed = headerValue !== null ? Number(headerValue) : Number.NaN;
  if (Number.isFinite(parsed) && parsed > 0) {
    const nowSec = Math.floor(Date.now() / 1000);
    const seconds = parsed > nowSec ? parsed - nowSec : parsed;
    return Math.min(Math.max(Math.ceil(seconds * 1000), 500), JWT_RATE_LIMIT_MAX_WAIT_MS);
  }
  return Math.min(1000 * 2 ** attempt, JWT_RATE_LIMIT_MAX_WAIT_MS);
}
