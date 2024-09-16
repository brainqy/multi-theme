

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../application_constant/environment';
export interface BadgeDto {
  id?: number;
  name: string;
  description: string;
  backgroundColor: string;
  icon: string;
  rule: string;
  threshold: number;
}


@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private baseUrl=environment.baseUrl+environment.contextUrl;
  private apiUrl =this.baseUrl+ '/api/badges'; // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

  createBadge(badge: BadgeDto): Observable<void> {
    console.log("in badge service passing ...",badge);
    
    return this.http.post<void>(this.apiUrl, badge);
  }

  getAllBadges(): Observable<BadgeDto[]> {
    return this.http.get<BadgeDto[]>(this.apiUrl);
  }

  getBadgeById(id: number): Observable<BadgeDto> {
    return this.http.get<BadgeDto>(`${this.apiUrl}/${id}`);
  }

  getBadgeByName(name: string): Observable<BadgeDto> {
    return this.http.get<BadgeDto>(`${this.apiUrl}/name/${name}`);
  }
  //asign badges
  assignEligibleBadges(userName: string): Observable<BadgeDto[]> {
    return this.http.post<BadgeDto[]>(`${this.apiUrl}/assignEligible`, {});
  }

 getMyBadges(): Observable<BadgeDto[]> {
    return this.http.get<BadgeDto[]>(`${this.apiUrl}/getMyBadges`);
  }
}
