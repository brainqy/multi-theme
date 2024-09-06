import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public forgotPassword(body: any, endPoint: string) {
    return this.http.put(this.baseurl + endPoint, body);
  }

  public changePassword(body: any) {
    return this.http.post(this.baseurl + environment.contextUrl + '/users/changePassword', body);
  }

  public resetPassword(body: any) {
    return this.http.post(this.baseurl + environment.contextUrl + '/users/resetPassword', body);
  }

}
