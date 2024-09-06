import {Inject, Injectable} from '@angular/core';
import {EncryptDecryptService} from "./encrypt-decrypt.service";
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private encryption: EncryptDecryptService) {
  }

  isAuthenticated(): boolean {
    const token=this.getToken();
    //const isValidToken=this.jwtService.isValidToken(token);
    return this.getToken() !== undefined;
  }

  storeToken(token: string) {
    const encryptedToken = this.encryption.getEncryption(token);
    this.storage.set("auth_token", encryptedToken);
  }
  storeStreak(streakNumber: number) {
    this.storage.set("daily_streak", streakNumber);
  }

  getStreak(){
    const streak=this.storage.get("daily_streak");
    return streak;
  }
  storeBalance(userBalance: any) {
    this.storage.set("userBalance", userBalance);
  }
  getBalance() {
    return this.storage.get("userBalance");
  }

  getToken() {
    const token = this.storage.get("auth_token");
    if (token)
      return token;
    else
      return undefined;
  }

  removeToken() {
    return this.storage.remove("auth_token");
  }
}
