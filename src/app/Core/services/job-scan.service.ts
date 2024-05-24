import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class JobScanService {

  private baseUrl = environment.baseUrl+environment.contextUrl; // Assuming the backend API is served at '/api'

  constructor(private http: HttpClient) { }

  generateReport(resume: string, jobDescription: string,randomString:string): Observable<SectionData[]> {
    const request = { resume, jobDescription ,randomString};
    return this.http.post<SectionData[]>(`${this.baseUrl}/generate-report`, request);
  }
  getLatestReport():Observable<any>{
    return this.http.get(`${this.baseUrl}/getLatestReport`);
  }

  getAllReportsByUser():Observable<any>{
    return this.http.get(`${this.baseUrl}/get-scan-history`);
  }
}
export interface SectionData {
  section: string;
  percentage: number;
  issues: number;
  data: DataItem[];
}

export interface DataItem {
  title: string;
  infoIcon: boolean;
  content: ContentItem[];
}

export interface ContentItem {
  tickIcon: boolean;
  contentValue: string;
}

