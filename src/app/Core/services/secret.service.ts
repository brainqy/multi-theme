import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private apiUrl = '/api/secret';
  private baseUrl = environment.baseUrl+environment.contextUrl+this.apiUrl;
  constructor(private http: HttpClient) {}

  // Method to save the secret
  saveSecret(secret: string): Observable<any> {
    // This example assumes that we are sending the secret to a backend
    const payload = { secret: secret };
    return this.http.post(this.baseUrl, payload);
  }
}
