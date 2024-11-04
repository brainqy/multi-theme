import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl=environment.baseUrl+environment.contextUrl;
  private dataUrl = 'assets/quizzes/${quizId}-quizdata.json';
  private chatUrl = '/quiz';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getQuestions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+this.chatUrl+"/get-all-questions"}`);
  }
  getQuizData(quizId: string): Observable<any> {
    const dataUrl = `assets/quizzes/${quizId}-quizdata.json`;
    return this.http.get<any>(dataUrl);
  }
}
