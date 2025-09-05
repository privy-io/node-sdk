import * as jose from 'jose';
export async function generateTestJWT() {
  const JWT_AUTH_SK = process.env['JWT_AUTH_SK']!;
  const JWT_AUTH_SUBJECT = process.env['JWT_AUTH_SUBJECT']!;

  const key = await jose.importPKCS8(JWT_AUTH_SK, 'RS256');
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setSubject(JWT_AUTH_SUBJECT)
    .setExpirationTime('1h')
    .sign(key);

  return jwt;
}
