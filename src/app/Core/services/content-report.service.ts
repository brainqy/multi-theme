import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentReport } from 'src/app/Component/feedback/reports/reports.component';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentReportService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private baseUrl = environment.baseUrl+environment.contextUrl+ '/content-reports';

  constructor(private http: HttpClient) { }

  saveReportContent(report: ContentReport): Observable<ContentReport> {
    console.log("in content report service ",report);
    return this.http.post<ContentReport>(`${this.baseUrl}/save`, report,this.httpOptions);
  }

  getAllContentReports(): Observable<ContentReport[]> {
    return this.http.get<ContentReport[]>(`${this.baseUrl}/get-all`);
  }
  getContentReportByLink(link: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getForLink?link=${link}`);
  }
  getContentReportByGroupLink(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getFbyGroupLink`);
  }
  getContentReportReportedBy(): Observable<any> {
    const url = `${this.baseUrl}/getContentReportedBy`;
    return this.http.get<any>(url);
  }
}
