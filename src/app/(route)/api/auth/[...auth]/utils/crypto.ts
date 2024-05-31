import CryptoJS from 'crypto-js';

function encrypt(text: string, password: string) {
  return CryptoJS.AES.encrypt(text, password).toString();
}

function decrypt(encrypted: string, password: string) {
  return CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8);
}
export { encrypt, decrypt };
