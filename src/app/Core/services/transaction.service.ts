import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl=environment.baseUrl+environment.contextUrl;

  private chatUrl = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+"/coins/getTransactions"}`);
  }
  getUserBalance(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+"/coins/getUserBalance"}`);
  }
  sendICSEmail(icsRequest: IcsRequest):Observable<any>{
    console.log("referral email ",icsRequest);
    return this.http.post(this.baseUrl  + '/ics/generate-ics',icsRequest,this.httpOptions);
  }
}
export interface IcsRequest {
  eventName:string,
  organizerName:string,
  organizerEmail:string,
  attendees: string[];
  subject: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}
