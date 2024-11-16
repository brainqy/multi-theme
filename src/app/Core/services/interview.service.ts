import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../application_constant/environment';
export interface BookedSlot {
  eventId: number;
  slotStart: Date;
  slotEnd: Date;
  bookerId: string;  // ID of the person booking the slot
  ownerId: string;   // ID of the person whose slot is being booked
  bookedStatus:boolean;
}
export interface ScheduleUser {
  fullName: string;
  emailAdd: string;
}

export interface Availability {
  eventId: number;
  title: string;
  start: number[]; // Array of numbers [year, month, day, hour, minute]
  end: number[];
  color: string;
  scheduleUser: ScheduleUser;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
private baseUrl=environment.baseUrl+environment.contextUrl;
  chatUrl: string="/interview-slots";

  constructor(private http: HttpClient) { }
  saveinterviewSlot(body:any):Observable<any>{
    console.log("interview slots ",body);
    return this.http.post(this.baseUrl  +this.chatUrl, body,this.httpOptions);
  }
  getAllInterviewSlots():Observable<any>{

    return this.http.get(this.baseUrl+this.chatUrl);
  }
  getAllInterviewSlotsByJobId(jobId:any):Observable<any>{

    return this.http.get(this.baseUrl+this.chatUrl+"/jobId/"+jobId);
  }
  updateInterviewSlot(id: number, updatedSlot: any): Observable<any> {
    const url = `${this.baseUrl+this.chatUrl}/${id}`;
    return this.http.put(url, updatedSlot);
  }
  cancelInterviewSlot(id: number): Observable<any> {
    const url = `${this.baseUrl+this.chatUrl+"/cancel"}/${id}`;
    return this.http.patch(url, "CANCEL");
  }
  getAllAvailableInterviewSlots():Observable<any>{

    return this.http.get(this.baseUrl+this.chatUrl+"/get_available_slots");
  }

}
