import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiBotService {
  private baseUrl=environment.baseUrl+environment.contextUrl;

  private chatUrl = '/org/bot/chat';

  constructor(private http: HttpClient) { }

  chat(prompt: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl+this.chatUrl}?prompt=${prompt}`);
  }
  createOrg(body:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log("i am in service bot ",body);
    return this.http.post<any>(`${this.baseUrl+"/org/create_org"}`,body,httpOptions);

  }
}
