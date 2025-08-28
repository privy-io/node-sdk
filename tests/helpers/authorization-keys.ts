import crypto from 'node:crypto';

export function generateP256KeyPair() {
  const keyPair = crypto.generateKeyPairSync('ec', {
    namedCurve: 'P-256',
    publicKeyEncoding: {
      type: 'spki',
      format: 'der',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der',
    },
  });

  return {
    publicKey: keyPair.publicKey.toString('base64'),
    privateKey: keyPair.privateKey.toString('base64'),
  };
}

export function derPublicKeyToPem(derPublicKey: string): string {
  const publicKey = crypto.createPublicKey({
    key: Buffer.from(derPublicKey, 'base64'),
    format: 'der',
    type: 'spki',
  });
  return publicKey.export({ type: 'spki', format: 'pem' }) as string;
}
