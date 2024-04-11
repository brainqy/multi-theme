import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // Import moment library for date manipulation
import { InterviewService } from 'src/app/Core/services/interview.service';

interface WeeklySlots {
  [day: string]: string[];
}
@Component({
  selector: 'app-booked-interviews',
  templateUrl: './booked-interviews.component.html',
  styleUrls: ['./booked-interviews.component.scss']
})
export class BookedInterviewsComponent {
  sideNavStatus=false;
  selectedSlot: { day: string, slot: string } | null = null;
  currentWeekStart: moment.Moment = moment().startOf('week'); // Start of current week
  isSchedulePageVisible:boolean=false;
  selectedInterviewType: string | null = null;
  isKindOfPracticePageVisible:boolean=false;
selectedKindOfInterviewType: string | null = null;
istheSlotSelected:boolean=false;
isTheSelectedInterviewType:boolean=false;
isTheSelectedkindOfInterviewType:boolean=false;
  
  interviewItems: string[] = [
    'Data Structures and algorithms',
    'System Design',
    'Java ',
    'Microservices',
    'Angular',
    'MySql',
    'Practice with Friends'
    // Add more interview types as needed
  ];
  kindOfInterview: string[] = [
    'Practice with peers',
    'Practice with experts',

    // Add more interview types as needed
  ];
  interviewSlots:any;

  datesWithSlots: { date: string, slots: string[] }[] = [];

  constructor(private modalService: NgbModal,private interviewService:InterviewService) {
    this.generateDatesWithSlots();
    this.getAllSlots();
  }
  generateDatesWithSlots() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = date.toISOString().split('T')[0];
      const slots = this.generateSlotsForDate(date);
      this.datesWithSlots.push({ date: formattedDate, slots: slots });
    }
  }

  generateSlotsForDate(date: Date): string[] {
    // Assuming slots from 8 AM to 6 PM with 30 minutes interval
    const slots = [];
    const startHour = 8;
    const endHour = 18;
    const interval = 30; // minutes

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const slot = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
        slots.push(slot);
      }
    }
  
    return slots;
  }
  toggleSlot(day: string, slot: string) {
    if (this.selectedSlot && this.selectedSlot.day === day && this.selectedSlot.slot === slot) {
      this.selectedSlot = null; // Deselect slot if already selected
      this.istheSlotSelected = false;
    } else {
      this.selectedSlot = { day, slot }; // Select slot
      this.istheSlotSelected = true;
    }
  }

  openBookingModal(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }


  bookSlot(bookingForm: any) {
    if (bookingForm.valid) {
      const bookingDate = bookingForm.value.bookingDate;
      const bookingTime = bookingForm.value.bookingTime;
      
      // Here you can handle the booking logic, such as sending the booking request to the server.
      console.log('Booking slot for Date:', bookingDate, 'Time:', bookingTime);

      // Close the modal after booking
      this.modalService.dismissAll();
    }
  }



  isSlotSelected(day: string, slot: string): boolean {
    return !!this.selectedSlot && this.selectedSlot.day === day && this.selectedSlot.slot === slot;
  }
  confirmAndSchedule() {
    const data: any = {};
  
    if (this.selectedSlot) {
      // Add selected slot to the data object
      data.slot = this.selectedSlot.slot;
      data.day=this.selectedSlot.day;
      data.status="SCHEDULED";
    }
  
    if (this.selectedInterviewType) {
      // Add selected interview type to the data object
      data.interviewType = this.selectedInterviewType;
    }
  
    if (this.selectedKindOfInterviewType) {
      // Add selected kind of interview type to the data object
      data.kindOfInterviewType = this.selectedKindOfInterviewType;
    }

  this.interviewService.saveinterviewSlot(data).subscribe((res)=>{
console.log(" called interview service",res);
this.modalService.dismissAll();
window.location.reload();
  })
    // Log or further process the data object
    console.log('Selected Data:', data);
  
    // Optionally, you can send the data object to a backend server for further processing
  }
  
  navigateWeek(weekOffset: number) {
    this.currentWeekStart.add(weekOffset, 'weeks'); // Move to the previous or next week
  }

  getDayOfWeek(date: moment.Moment): string {
    return date.format('dddd');
  }
  showInterviewTypePage() {
    this.isSchedulePageVisible = false;
  }
  hideInterviewTypePage() {
    this.isKindOfPracticePageVisible=true;
  }  
  hideKindOfPracticePage(){
    this.isKindOfPracticePageVisible=false;
    this.isSchedulePageVisible=true;
  }
  toggleSelection(item: string) {
    if (this.selectedInterviewType === item) {
      this.selectedInterviewType = null; // Deselect item if already selected
      this.isTheSelectedInterviewType=false;
    } else {
      this.selectedInterviewType = item; // Select item
      this.isTheSelectedInterviewType=true;
    }
  }
  
  isSelectedInterviewType(item: string): boolean {
    return this.selectedInterviewType === item;
  }
  isSelectedkindOfInterviewType(item: string): boolean {
    return this.selectedKindOfInterviewType === item;
  }
  toggleKindOfSelection(item: string) {
    if (this.selectedKindOfInterviewType === item) {
      this.selectedKindOfInterviewType = null; // Deselect item if already selected
      this.isTheSelectedkindOfInterviewType=false;
    } else {
      this.selectedKindOfInterviewType = item; // Select item
      this.isTheSelectedkindOfInterviewType=true;
    }
  }
  getAllSlots(){
    this.interviewService.getAllInterviewSlots().subscribe((res)=>{
      this.interviewSlots=res;
console.log("all slots ",res);
    })
  }
  updateSlot(id: number, updatedSlot: any) {
    this.interviewService.updateInterviewSlot(id, updatedSlot)
      .subscribe(
        response => {
          console.log('Slot updated successfully:', response);
          // Do something with the response if needed
        },
        error => {
          console.error('Error updating slot:', error);
          // Handle error if needed
        }
      );
  }

  cancelInterviewSlot(id:any){
    console.log("id is ",id);
    this.interviewService.cancelInterviewSlot(id).subscribe((res)=>{
console.log(" Canceled slot is ",res);
    })
    window.location.reload();


  }
 
  
}
