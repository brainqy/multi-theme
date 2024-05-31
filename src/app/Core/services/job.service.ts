import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

export interface Job {
  jobDescription?: any;
  jobRole?: any;
  id?: number;
  jobLocation: string;
  company: string;
  status: string;
  jobListingUrl?: string; // Make optional
  salary?: number; // Make optional
  dateSpecified?: string; // Make optional
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
    console.log("in job service  id", job);
    
    return this.http.patch<Job>(url, job, this.httpOptions);
  }
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job, this.httpOptions);
  }
  saveJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  getJobById(id: number): Observable<Job> {
    const url = `${this.baseUrl}/${id}`; // Adjust the URL to match your backend endpoint
    return this.http.get<Job>(url);
  }
}
