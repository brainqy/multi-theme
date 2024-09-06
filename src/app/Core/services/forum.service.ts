import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl=environment.baseUrl+environment.contextUrl+"/forum"


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

  getForum(forumId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${forumId}`);
  }

  getAllForumPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAll`);
  }
}

export interface Forum {
  id:number;
  forum_title: string;
  forum_body: string;
  createdBy: string;
  createdAt: string;
}
