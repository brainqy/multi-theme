import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {


  private baseUrl=environment.baseUrl+environment.contextUrl+"/forum"
  private bookmarkUrl=environment.baseUrl+environment.contextUrl+"/api/bookmarks"


  constructor(private http: HttpClient) { }

  createForum(forum: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createForum`, forum);
  }

  updateForum(forumId: number, forum: Forum): Observable<any> {
    return this.http.put(`${this.baseUrl}/${forumId}`, forum);
  }

  deleteForum(forumId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${forumId}`);
  }
  saveAsStarred(postId: number): Observable<any> {
    console.log("postID",postId);
    
    return this.http.put<any>(`${this.baseUrl}/${postId}/star`, {})
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

  getForum(forumId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${forumId}`);
  }

  getAllForumPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAll`);
  }
  getBookmarkedPosts() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllBookmarked`);
  }
}

export interface Forum {
  id:number;
  forum_title: string;
  forum_body: string;
  createdBy: string;
  createdAt: string;
}
