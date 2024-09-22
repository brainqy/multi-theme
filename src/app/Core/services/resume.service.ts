import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string; // You can use Date if you prefer
  endDate: string;   // You can use Date if you prefer
}

export interface Qualification {
  degree: string;
  institution: string;
}

export interface Resume {
  id: number; // Add this if you have an ID for each resume
  applicantName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string; // Consider using Date if necessary
  experiences: Experience[];
  qualifications: Qualification[];
  certifications?: string;
  achievements?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  referenceName?: string;
  referenceEmail?: string;
  referencePhone?: string;
  starred?: boolean;
}

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
  getResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.baseUrl}/get-all-resumes`);
  }
  saveAsStarred(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/star`, {})
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
