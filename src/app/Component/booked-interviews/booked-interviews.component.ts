import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class BookedInterviewsComponent implements OnInit{
  bookerId:string="";
  ownerId:string="";
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
availableSlots: { [date: string]: { slotStart: Date; slotEnd: Date }[] } = {};

   kindOfInterview: string[] = [
    'Data Structures and algorithms',
    'System Design',
    'Java ',
    'Microservices',
    'Angular',
    'MySql',
    // Add more interview types as needed
  ];
  interviewItems: string[] = [
    'Practice with Friends',
    'Practice with experts',
    'Practice with AI',

    // Add more interview types as needed
  ];
  interviewSlots:any;
  invitationForm: FormGroup;
  datesWithSlots: { date: string; slots: { slotStart: Date; slotEnd: Date; }[] }[] = [];

  interviewBalance!: number;

  constructor(private modalService: NgbModal,
    public interviewService:InterviewService,
    private router: Router,
    private fb: FormBuilder) {
    this.getAllSlots();

    this.invitationForm = this.fb.group({
      friendEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
    
  }
  ngOnInit(): void {
        this.generateDatesWithSlots();
    this.getAvailableInterviewSLots();
 this.generateAllAvailableSlots();
  }
  get friendEmail() {
    return this.invitationForm.get('friendEmail');
  }
  
  onSubmit(): void {
    if (this.invitationForm.valid) {
      const email = this.invitationForm.value.friendEmail;
      console.log('Sending invitation to:', email);
      // Add further logic for sending the invitation here
    }
  }
  allslots: any;
  generateAllAvailableSlots(){
  this.allslots= this.interviewService.getAllAvailableSlots();
   console.log("allslots avl",this.allslots);
   
  }
  isSlotAvailable(date: string, slot: { slotStart: Date, slotEnd: Date }): boolean {
    // Combine date with slot's start time to create a complete Date object for comparison
    const dateTime = new Date(date + ' ' + slot.slotStart.toISOString().substring(11, 19)); // Only take the time part from ISO string
    // Retrieve available slots for this date
    const slotsForDate = this.interviewService.getAllAvailableSlotsByDate(date);
//  console.log("slotsForDate ",slotsForDate);
  
    // Check if any slot in available slots matches the given time range
    return slotsForDate && slotsForDate.some((availableSlot: { slotStart: string | number | Date; slotEnd: string | number | Date; }) => {
      const slotStart = new Date(availableSlot.slotStart);
      const slotEnd = new Date(availableSlot.slotEnd);
  
      // Check if the dateTime is within the range of slotStart and slotEnd
      return dateTime >= slotStart && dateTime < slotEnd;
    });
  }
  
  
  formatSlotTime(slotStart: Date, slotEnd: Date): string {
    const startHours = slotStart.getHours().toString().padStart(2, '0');
    const startMinutes = slotStart.getMinutes().toString().padStart(2, '0');
    const endHours = slotEnd.getHours().toString().padStart(2, '0');
    const endMinutes = slotEnd.getMinutes().toString().padStart(2, '0');
    
    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
  }
  
generateDatesWithSlots() {
  const today = new Date();
  
  // Loop for 7 days to generate dates with slots
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const formattedDate = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    const slots = this.interviewService.generateAllAvailableSlotsForDate(date);
    this.datesWithSlots.push({ date: formattedDate, slots: slots });
    console.log("datesWithSlots", this.datesWithSlots);
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
        const slot = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'PM' : 'AM'}`;
        slots.push(slot);
      }
    }
  
    return slots;
  }
  toggleSlot(date: string, slot: { slotStart: Date, slotEnd: Date }) {
    this.selectedSlot = {
      day: date,
      slot: slot.slotStart.toISOString() // You may store this as an ISO string for comparison
    };
    this.istheSlotSelected=true;
    console.log("Selected Slot:", new Date(this.selectedSlot.slot)  );
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



// Assuming selectedSlot now includes 'slotStart' and 'slotEnd'
isSlotSelected(date: string, slot: { slotStart: Date, slotEnd: Date }): boolean {
  return (
    !!this.selectedSlot && 
    this.selectedSlot.day === date && 
    this.selectedSlot.slot === slot.slotStart.toISOString() // Compare ISO strings
  );
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
      // Assuming `friendEmail` is a form control in a FormGroup
  if (this.invitationForm.get('friendEmail')?.valid) {
    data.hrEmail = this.invitationForm.get('friendEmail')?.value;
    console.log("data ",data);
    
  } else {
    console.warn("Friend's email is not valid");
  }

  this.interviewService.saveinterviewSlot(data).subscribe((res)=>{
console.log(" called interview service",res);
this.removeBookedSlotFromDatesWithSlots(data.day, data.slot);
this.modalService.dismissAll();
  })
    // Log or further process the data object
    console.log('Selected Data:', data);
  
    // Optionally, you can send the data object to a backend server for further processing
  }
  removeBookedSlotFromDatesWithSlots(date: string, slotToRemove: { slotStart: Date; slotEnd: Date }) {
    const dateWithSlots = this.datesWithSlots.find(d => d.date === date);
  
    if (dateWithSlots) {
      // Filter out the slot to remove, ensuring slotStart and slotEnd are defined
      dateWithSlots.slots = dateWithSlots.slots.filter(slot => {
        const slotStart = slot.slotStart ? slot.slotStart.getTime() : null;
        const slotEnd = slot.slotEnd ? slot.slotEnd.getTime() : null;
        const removeStart = slotToRemove.slotStart ? slotToRemove.slotStart.getTime() : null;
        const removeEnd = slotToRemove.slotEnd ? slotToRemove.slotEnd.getTime() : null;
  
        return !(slotStart === removeStart && slotEnd === removeEnd);
      });
  
      // Optional: Remove date if no slots remain
      if (dateWithSlots.slots.length === 0) {
        this.datesWithSlots = this.datesWithSlots.filter(d => d !== dateWithSlots);
      }
    }
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

  onSelectInterviewType(item: string): void {
    this.selectedInterviewType = item;
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
  
  getAvailableInterviewSLots(){
    this.interviewService.getAllAvailableInterviewSlots().subscribe(res=>{
      console.log("available interview slots ",res);
      
    })
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
  // Sample Availability Data
  availableSlotswithid: { slotStart: Date, slotEnd: Date }[] = [];
  selectedEventId: number | null = null;
  showAvailableSlots(eventId: number): void {
    this.selectedEventId = eventId;
    this.availableSlotswithid = this.interviewService.generateAvailableSlots(eventId);
  }

  bookAvailableSlot(eventId: number, slotStart: Date, slotEnd: Date, bookerId: string, ownerId: string): void {
    const success = this.interviewService.bookAvailableSlot(eventId, slotStart, slotEnd, bookerId, ownerId);
    
    if (success) {
      alert(`Slot booked successfully from ${slotStart.toLocaleTimeString()} to ${slotEnd.toLocaleTimeString()}`);
      // Refresh the available slots after successful booking
      this.showAvailableSlots(eventId);
    } else {
      alert('This slot is already booked.');
    }
  }
  
}
