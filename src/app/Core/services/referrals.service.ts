import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferralsService {
  private baseUrl=environment.baseUrl+environment.contextUrl;

  private chatUrl = '/refer';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  getReferrals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+this.chatUrl+"/getReferrals"}`);
  }
  getWallet():Observable<any>{
    return this.http.get<any>(`${this.baseUrl+this.chatUrl+"/wallet"}`);
  }
  sendEmail(body:any):Observable<any>{
    console.log("referral email ",body);
    return this.http.post(this.baseUrl  +this.chatUrl+ '/resendEmail', body,this.httpOptions);
  }
  getMyReferralLink(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl+this.chatUrl+"/getReferralLink"}`)
  }

}
