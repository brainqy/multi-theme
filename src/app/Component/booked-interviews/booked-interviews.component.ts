import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // Import moment library for date manipulation
import { InterviewService } from 'src/app/Core/services/interview.service';
import Swal from 'sweetalert2';

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
  
   kindOfInterview: string[] = [
    'Data Structures and algorithms',
    'System Design',
    'Java ',
    'Microservices',
    'Angular',
    'MySql',
    'Practice with Friends'
    // Add more interview types as needed
  ];
  interviewItems: string[] = [
    'Practice with peers',
    'Practice with experts',
    'Practice with AI'

    // Add more interview types as needed
  ];
  interviewSlots:any;

  datesWithSlots: { date: string, slots: string[] }[] = [];
  interviewBalance!: number;

  constructor(private modalService: NgbModal,private interviewService:InterviewService,private router: Router) {
    this.getAllSlots();
    this.generateDatesWithSlots();
    
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
  getMoreFree() {
    Swal.fire({
      title: "Info",
      html: `
        <p style="font-family: 'Arial', sans-serif; font-size: 16px; color: #333;">
          <i class="fas fa-info-circle" style="color: #007BFF;"></i> You can get free interview credits by referring your friends or by logging in daily. If you log in daily, you will be credited coins, which can be used for interviews. Additionally, sharing your referral link with friends can earn you extra coins. The more friends you refer, the more credits you accumulate. Make sure to take advantage of this opportunity to maximize your interview chances. Consistent daily logins will also help you build a substantial coin balance over time.
        </p>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-user-friends"></i> Refer a Friend',
      cancelButtonText: '<i class="fas fa-sign-in-alt"></i> Log In Daily',
      customClass: {
        popup: 'custom-swal'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/referrals']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Code to log in daily
      }
    });
  }
  
  
  
  getAllSlots(){
    this.interviewService.getAllInterviewSlots().subscribe((res)=>{
      console.log("all slots",res);
      
      this.interviewSlots=res.data.data;
      this.interviewBalance = Math.floor(res.data.coinBalance / 26);
      console.log("interview Balance ",this.interviewBalance);
      
     console.log("all slots ",res);
     if(this.interviewSlots.length==0){
Swal.fire("Info","No Upcoming Interviews Found",'info');
     }
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

  cancelInterviewSlot(slot: any) {
    // Display confirmation popup
    Swal.fire({
      title: 'Are you Sure?',
      text: 'You want to cancel the slot',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      // If user confirms the action
      if (result.isConfirmed) {
        console.log("id is ", slot.id);
        // Call API to cancel the slot
        this.interviewService.cancelInterviewSlot(slot.id).subscribe((res) => {
          console.log("Canceled slot is ", res);
          // Reload the page after cancelling the slot
          window.location.reload();
        });
      }
    });
  }
  getNonCanceledSlots(slots: any[]): any[] {
    if (!slots) {
      console.log('No slots found');
      return [];
    }
    return slots.filter(slot => slot.status !== 'CANCELED');
  }
  getCanceledSlots(slots: any[]): any[] {
    if (!slots) {
      console.log('No slots found');
      return [];
    }
    return slots.filter(slot => slot.status === 'CANCELED');
  }
  
}
