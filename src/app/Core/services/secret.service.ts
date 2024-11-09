import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private apiUrl = '/api/secrets';
  private baseUrl = environment.baseUrl+environment.contextUrl+this.apiUrl;
  constructor(private http: HttpClient) {}

  // Method to save the secret
  saveSecret(key: string, secret: string): Observable<any> {
    // This example assumes that we are sending the secret to a backend
    const payload = { key: key, secret: secret };
    return this.http.post(this.baseUrl+"/add", payload);
  }
  getSecret():Observable<any>{
    return this.http.get(this.baseUrl);
  }
  saveGmailSecret(secret: string): Observable<any> {
    // This example assumes that we are sending the secret to a backend
    const payload = { secret: secret };
    return this.http.post(this.baseUrl+"/gmail/add", payload);
  }
  getGmailSecret():Observable<any>{
    return this.http.get(this.baseUrl+"/gmail");
  }
}
