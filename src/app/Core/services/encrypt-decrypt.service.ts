import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  private encryptionKey = "encryption-key"

  constructor() {
  }

  getEncryption(plainText: string): any {
    return CryptoJS
      .AES
      .encrypt(plainText, this.encryptionKey)
      .toString();
  }

  getDecryption(encText: string): any {
    try {
      return CryptoJS
        .AES
        .decrypt(encText, this.encryptionKey)
        .toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log("Error while decrypting the token")
    }
  }
}
