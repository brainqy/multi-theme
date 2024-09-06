import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {EncryptDecryptService} from "./encrypt-decrypt.service";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private encryptService: EncryptDecryptService,private auth:AuthService) {
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.log("Error while decoding the token...so removing token")
      this.auth.removeToken();
    }
  }

  getFullNameFromToken(token: string): any {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (decodedToken) {
      return decodedToken.fullName;
    }
  }

  getUserNameFromToken(token: string): any {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (decodedToken) {
      return decodedToken.sub;
    }
  }

  getRoleFromToken(token: string): any {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (decodedToken) {
      return decodedToken.roles;
    }
  }

  isTokenExpired(token: string): boolean {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decodedToken.exp < currentTime;
  }

  // Validate the token
  isValidToken(token: string): boolean {
    if (!token) {
      return false;
    }

    return !this.isTokenExpired(token);
  }
}
