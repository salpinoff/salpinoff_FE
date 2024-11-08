import CryptoJS from 'crypto-js';

function encrypt(text: string, password: string) {
  return CryptoJS.AES.encrypt(text, password).toString();
}

function decrypt(encrypted: string, password: string) {
  return CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8);
}

function createCSRFToken(secret: string) {
  const token = CryptoJS.lib.WordArray.random(24).toString();
  const hash = CryptoJS.HmacSHA256(token, secret).toString();

  return `${token}|${hash}`;
}

function verifyCSRFToken(token: string, secret: string) {
  const [receivedToken, receivedHash] = token.split('|');
  const expectedHash = CryptoJS.HmacSHA256(receivedToken, secret).toString();
  return receivedHash === expectedHash;
}

export { encrypt, decrypt, createCSRFToken, verifyCSRFToken };
