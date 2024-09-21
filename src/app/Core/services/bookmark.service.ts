import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bookmark {
  id: number;          // The ID of the bookmark
  userEmail: string;    // The email of the user who bookmarked
  articleUrl: string;   // The URL of the bookmarked article
  createdAt: Date;      // The date and time when the bookmark was created
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private apiUrl = '/api/bookmarks';

  constructor(private http: HttpClient) {}

  addBookmark(userId: number, articleId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, { userId, articleId });
  }

  removeBookmark(userId: number, articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove?userId=${userId}&articleId=${articleId}`);
  }

  getUserBookmarks(userId: number): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.apiUrl}/user/${userId}`);
  }
}

