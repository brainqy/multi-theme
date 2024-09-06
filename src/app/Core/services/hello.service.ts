import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  private baseUrl=environment.baseUrl+environment.contextUrl;


  constructor(private http: HttpClient) { }
  getHello(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }
  getForum(forumId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${forumId}`);
  }
  
  
}
