import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

export interface Job {
  id?: number;
  jobRole: string;
  jobLocation: string;
  company: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = '/jobs';
  private baseUrl = environment.baseUrl+environment.contextUrl+this.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl);
  }

  updateJobStatus(job: Job): Observable<Job> {
    const url = `${this.baseUrl}/${job.id}`;
    return this.http.put<Job>(url, job, this.httpOptions);
  }
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job, this.httpOptions);
  }
}
