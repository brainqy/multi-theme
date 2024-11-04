import {Inject, Injectable} from '@angular/core';
import {EncryptDecryptService} from "./encrypt-decrypt.service";
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import { JwtService } from './jwt.service';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from '../application_constant/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl+environment.contextUrl;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private encryption: EncryptDecryptService,private router: Router,private http: HttpClient) {
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

verifyToken(email: string): Observable<any> { // Change type to boolean to match backend
  return this.http.post<any>(`${this.baseUrl}/verify-token`, { email: email });
}
}
