import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.baseUrl+environment.contextUrl+ '/contact';
  constructor(private http: HttpClient) { }

  sendContactForm(formData: any): Observable<any> {
    console.log("form ",formData);
    
    return this.http.post<any>(this.apiUrl, formData);
  }
}
