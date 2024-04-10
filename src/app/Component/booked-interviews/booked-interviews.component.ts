import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // Import moment library for date manipulation

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
  interviewSessions = [
    {
      date: 'Tue, Apr 9, 2024',
      type: 'System Design',
      question: 'Spring security',
      language: 'Java',
      action: 'Cancel/Reschedule'
    },
    {
      date: 'Tue, Apr 9, 2024',
      type: 'Algorithm',
      question: 'Microservices',
      language: 'Java',
      action: 'Cancel/Reschedule'
    }
  ];
  daysInWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  slots: WeeklySlots = {
   
    'Mon': ['9:00 AM', '11:00 AM', '1:00 PM'],
    'Tue': ['8:00 AM', '12:00 PM', '3:00 PM'],
    'Wed': ['8:00 AM', '9:00 AM', '10:00 AM'],
    'Thu': ['9:00 AM', '11:00 AM', '1:00 PM'],
    'Fri': ['8:00 AM', '12:00 PM', '3:00 PM'],
    'Sat': ['8:00 AM', '9:00 AM', '10:00 AM'],
    // Add slots data for other days as needed
  };

  constructor(private modalService: NgbModal) {}
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
      data.slot = this.selectedSlot;
    }
  
    if (this.selectedInterviewType) {
      // Add selected interview type to the data object
      data.interviewType = this.selectedInterviewType;
    }
  
    if (this.selectedKindOfInterviewType) {
      // Add selected kind of interview type to the data object
      data.kindOfInterviewType = this.selectedKindOfInterviewType;
    }
  
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
    } else {
      this.selectedInterviewType = item; // Select item
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
    } else {
      this.selectedKindOfInterviewType = item; // Select item
    }
  }
  
}
