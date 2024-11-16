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
  availability = [
    {
      eventId: 1,
      title: "AVAILABILITY",
      start: [2024, 11, 13, 22, 33],
      end: [2024, 11, 16, 22, 33],
      color: "#90dd1d",
      scheduleUser: { fullName: "Dnyanesh", emailAdd: "dvsomwanshi@gmail.com" }
    },
    {
      eventId: 3,
      title: "AVAILABILITY",
      start: [2024, 11, 17, 8, 30],
      end: [2024, 11, 22, 8, 30],
      color: "#90dd1d",
      scheduleUser: { fullName: "Dnyanesh", emailAdd: "dvsomwanshi@gmail.com" }
    }
  ];
  //bookedSlots: Array<{ eventId: number, slotStart: Date, slotEnd: Date }> = [];
  bookedSlots: BookedSlot[] = [];

  // Convert start and end time arrays to Date objects
  public toDate(dateArray: number[]): Date {
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
  }


  // Generate slots for all events with title "AVAILABILITY"
// Generate slots for all events with title "AVAILABILITY"
isTheSelectedkindOfInterviewType:boolean=false;
availableSlots: { [date: string]: {}[] } = {};
// Inside interviewService



// Helper function to format time as "HH:mm"
formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}


generateAllAvailableSlotsForDate(date: Date, slotDuration: number = 30): { slotStart: Date, slotEnd: Date }[] {
  const allAvailableSlots: { slotStart: Date, slotEnd: Date }[] = [];
  
  // Assuming this.availability contains the available time ranges
  this.availability.forEach(availability => {
    const start = this.toDate(availability.start); // Assuming this.toDate converts strings to Date
    const end = this.toDate(availability.end);
    
    // Adjust the start time to the nearest available half-hour
    let currentSlot = new Date(start);
    if (currentSlot.getMinutes() > 0 && currentSlot.getMinutes() < 30) {
      currentSlot.setMinutes(30, 0, 0); // Set to the next half hour
    } else if (currentSlot.getMinutes() >= 30) {
      currentSlot.setHours(currentSlot.getHours() + 1, 0, 0, 0); // Set to the next hour
    }

    // Loop through the available slots until the end time
    while (currentSlot < end) {
      const slotEnd = new Date(currentSlot);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration); // Add duration to create the end time

      // Break if the slot end time exceeds the availability range
      if (slotEnd > end) {
        break;
      }

      // Check if the slot is already booked
      const isBooked = this.bookedSlots.some(
        bookedSlot => bookedSlot.slotStart.getTime() === currentSlot.getTime() && bookedSlot.eventId === availability.eventId
      );

      // If the slot is not booked, add it to the available slots
      if (!isBooked) {
        allAvailableSlots.push({ slotStart: new Date(currentSlot), slotEnd: new Date(slotEnd) });
      }

      // Move to the next slot by adding the duration
      currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
    }
  });

  return allAvailableSlots; // Return the available slots for this date
}

  
 // Book a specific slot


}
