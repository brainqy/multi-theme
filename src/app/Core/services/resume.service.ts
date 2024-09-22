import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = '/api/resumes';
  private baseUrl = environment.baseUrl+environment.contextUrl+this.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  /**
   * Upload resume file with job opportunity ID.
   * @param resumeFile The resume file to upload.
   * @param jobOpportunityId The job opportunity ID to associate the resume with.
   */
/*   createResume(resumeFile: File, jobOpportunityId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobOpportunityId', jobOpportunityId.toString());

    // Make the POST request to upload the resume
    return this.http.post(`${this.baseUrl}`, formData);
  } */

  createResume(formData: any): Observable<any> {
console.log("data ",formData);


    return this.http.post<any>(this.baseUrl, formData,this.httpOptions);
  }
}
