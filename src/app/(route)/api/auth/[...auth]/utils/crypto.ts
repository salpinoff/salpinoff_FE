import crypto from 'crypto';

function encrypt(text: string, password: string) {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // IV와 salt를 암호문과 함께 문자열로 결합
  const combined = `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;

  return combined;
}

function decrypt(encryptedCombined: string, password: string) {
  const [saltHex, ivHex, encryptedData] = encryptedCombined.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
export { encrypt, decrypt };
