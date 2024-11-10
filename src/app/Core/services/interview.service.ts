import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../application_constant/environment';

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
  bookedSlots: Array<{ eventId: number, slotStart: Date, slotEnd: Date }> = [];

  // Convert start and end time arrays to Date objects
  public toDate(dateArray: number[]): Date {
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
  }

  generateAvailableSlots(eventId: number, slotDuration = 30): { slotStart: Date, slotEnd: Date }[] {
    const availability = this.availability.find(a => a.eventId === eventId);
    if (!availability) return [];
  
    const start = this.toDate(availability.start);
    const end = this.toDate(availability.end);
    const slots: { slotStart: Date, slotEnd: Date }[] = [];
  
    // Adjust start to the next closest half-hour mark
    const currentSlot = new Date(start);
    if (currentSlot.getMinutes() > 0 && currentSlot.getMinutes() < 30) {
      currentSlot.setMinutes(30, 0, 0); // Set to :30
    } else if (currentSlot.getMinutes() > 30) {
      currentSlot.setHours(currentSlot.getHours() + 1, 0, 0, 0); // Set to the next hour
    }
  
    while (currentSlot < end) {
      const slotEnd = new Date(currentSlot);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
      
      if (slotEnd > end) break;  // Stop if slot end exceeds availability
  
      // Check if slot is already booked
      const isBooked = this.bookedSlots.some(
        s => s.eventId === eventId && s.slotStart.getTime() === currentSlot.getTime()
      );
  
      if (!isBooked) {
        slots.push({ slotStart: new Date(currentSlot), slotEnd: new Date(slotEnd) });
      }
  
      // Move to the next half-hour slot
      currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
    }
    return slots;
  }
  // Generate slots for all events with title "AVAILABILITY"
// Generate slots for all events with title "AVAILABILITY"
isTheSelectedkindOfInterviewType:boolean=false;
availableSlots: { [date: string]: {}[] } = {};
getAllAvailableSlots(slotDuration: number = 30): { slotStart: Date, slotEnd: Date }[] {
  const allAvailableSlots: { slotStart: Date, slotEnd: Date }[] = [];

  // Iterate through each availability entry
  this.availability.forEach(availability => {
    const start = this.toDate(availability.start);
    const end = this.toDate(availability.end);
    
    let currentSlot = new Date(start);

    // Adjust start time to the nearest available half-hour
    if (currentSlot.getMinutes() > 0 && currentSlot.getMinutes() < 30) {
      currentSlot.setMinutes(30, 0, 0); // Set to :30
    } else if (currentSlot.getMinutes() >= 30) {
      currentSlot.setHours(currentSlot.getHours() + 1, 0, 0, 0); // Set to the next hour
    }

    // Loop through the available slots until the end time
    while (currentSlot < end) {
      const slotEnd = new Date(currentSlot);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration); // Add duration to create slot end time

      // Break if the slot end time exceeds the availability range
      if (slotEnd > end) {
        break;
      }

      // Check if this slot is already booked
      const isBooked = this.bookedSlots.some(
        bookedSlot => bookedSlot.slotStart.getTime() === currentSlot.getTime() && bookedSlot.eventId === availability.eventId
      );

      // If the slot is not booked, add it to the list
      if (!isBooked) {
        allAvailableSlots.push({ slotStart: new Date(currentSlot), slotEnd: new Date(slotEnd) });
      }

      // Move to the next slot (add slot duration to currentSlot)
      currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
    }
  });

  return allAvailableSlots; // Return all available slots
}
getAllAvailableSlotsByDate(date: string, slotDuration: number = 30): { slotStart: Date, slotEnd: Date }[] {
  const allAvailableSlotsForDate: { slotStart: Date, slotEnd: Date }[] = [];
  
  // Convert the string date to a Date object representing the start of the day (00:00)
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0); // Set to midnight to represent the start of the day

  // Calculate the end of the day (23:59:59.999)
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

  // Iterate through each availability entry
  this.availability.forEach(availability => {
    const start = this.toDate(availability.start);
    const end = this.toDate(availability.end);
    
    // If the availability period overlaps with the target date
    if (start <= endOfDay && end >= targetDate) {
      let currentSlot = new Date(start);

      // Adjust the currentSlot to the nearest available half-hour
      if (currentSlot.getMinutes() > 0 && currentSlot.getMinutes() < 30) {
        currentSlot.setMinutes(30, 0, 0); // Set to :30
      } else if (currentSlot.getMinutes() >= 30) {
        currentSlot.setHours(currentSlot.getHours() + 1, 0, 0, 0); // Set to the next hour
      }

      // Loop through the available slots until the end time
      while (currentSlot < end && currentSlot <= endOfDay) {
        const slotEnd = new Date(currentSlot);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration); // Add duration to create slot end time

        // Break if the slot end time exceeds the availability range or the end of the day
        if (slotEnd > end || slotEnd > endOfDay) {
          break;
        }

        // Check if this slot is already booked
        const isBooked = this.bookedSlots.some(
          bookedSlot => bookedSlot.slotStart.getTime() === currentSlot.getTime() && bookedSlot.eventId === availability.eventId
        );

        // If the slot is not booked, add it to the list
        if (!isBooked) {
          allAvailableSlotsForDate.push({ slotStart: new Date(currentSlot), slotEnd: new Date(slotEnd) });
        }

        // Move to the next slot (add slot duration to currentSlot)
        currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
      }
    }
  });

  return allAvailableSlotsForDate; // Return all available slots for the specified date
}


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
 bookavilableSlot(eventId: number, slotStart: Date, slotEnd: Date): boolean {
  const isAvailable = !this.bookedSlots.some(
    s => s.eventId === eventId && s.slotStart.getTime() === slotStart.getTime()
  );

  if (isAvailable) {
    this.bookedSlots.push({ eventId, slotStart, slotEnd });
    return true;
  }
  return false;  // Slot is already booked
}

}
