import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../application_constant/environment';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  baseurl: string = environment.baseUrl + environment.contextUrl + '/calendar/events';
  interviewurl: string = environment.baseUrl + environment.contextUrl + '/interview';

  constructor(private modal: NgbModal, private http: HttpClient) { }

  public createEvent(event: any): Observable<any> {
    console.log(' Event creation in calendar service : ', event);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.baseurl + "/create", event, httpOptions);
  }
  scheduleInterview(requestData: any): Observable<any> {
    console.log("requestData ", requestData);
    return this.http.post<any>(`${this.interviewurl}/generate-ics`, requestData);
  }


  public getAllEventsExceptLoggedIn(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/available-appointments').pipe(
      map((response: any) => {
        // If response needs processing, do it here
        try {
          // Ensure response is parsed correctly
          return typeof response === 'string' ? JSON.parse(response) : response;
        } catch (error) {
          throw new Error('Response parsing failed.');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching events:', error);
        // Customize the error message for the caller
        return throwError(() => new Error('Failed to fetch events. Please try again later.'));
      })
    );
  }

  public updateEvent(eventId: any, updatedEvent: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const updateUrl = `${this.baseurl}/update/${eventId}`;
    console.log("in calendar.service " + JSON.stringify(updatedEvent));
    console.log("url is" + updateUrl)
    return this.http.put<any>(updateUrl, updatedEvent, httpOptions);
  }

  public deleteEvent(eventId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const deleteUrl = `${this.baseurl}/delete/${eventId}`;
    return this.http.delete<any>(deleteUrl, httpOptions);
  }
  getEventById(eventId: any): Observable<CalendarEvent> {
    const updateUrl = `${this.baseurl}/get/${eventId}`;
    return this.http.get<CalendarEvent>(updateUrl);
  }
  public searchByTrainer(trainerEmail: string): Observable<any> {
    return this.http.get<any>(this.baseurl + '/get/trainer-calendar?email=' + trainerEmail);
  }

  public updateAppointmentEvent(eventId: any, updatedEvent: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const updateUrl = `${this.baseurl}/update/${eventId}`;
    console.log("in calendar.service " + JSON.stringify(updatedEvent));
    console.log("url is" + updateUrl)
    return this.http.patch<any>(updateUrl, updatedEvent, httpOptions);
  }
  getAllInterviewSlotsExceptLogedInUser():Observable<any>{

    return this.http.get(this.baseurl+"/available-appointments");
  }
}