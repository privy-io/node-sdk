import crypto from 'node:crypto';

export async function generateP256KeyPair() {
  const keyPair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, [
    'sign',
    'verify',
  ]);

  const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return { publicKey: Buffer.from(publicKey), privateKey: Buffer.from(privateKey) };
}

export function publicKeyToPem(publicKey: Buffer): string {
  const publicKeyPem = publicKey.toString('base64');
  return `-----BEGIN PUBLIC KEY-----\n${publicKeyPem}\n-----END PUBLIC KEY-----`;
}

export function privateKeyToPem(privateKey: Buffer): string {
  const privateKeyPem = privateKey.toString('base64');
  return `-----BEGIN PRIVATE KEY-----\n${privateKeyPem}\n-----END PRIVATE KEY-----`;
}
