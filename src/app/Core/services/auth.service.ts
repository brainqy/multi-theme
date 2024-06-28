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
