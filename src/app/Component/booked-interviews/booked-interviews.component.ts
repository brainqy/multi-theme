import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // Import moment library for date manipulation
import { AuthService } from 'src/app/Core/services/auth.service';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { Availability, InterviewService } from 'src/app/Core/services/interview.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import Swal from 'sweetalert2';

interface WeeklySlots {
  [day: string]: string[];
}
export interface BookedSlot {
  eventId: number;
  slotStart: Date;
  slotEnd: Date;
  bookerId: string;  // ID of the person booking the slot
  ownerId: string;   // ID of the person whose slot is being booked
  bookedStatus: boolean;
}
@Component({
  selector: 'app-booked-interviews',
  templateUrl: './booked-interviews.component.html',
  styleUrls: ['./booked-interviews.component.scss']
})
export class BookedInterviewsComponent implements OnInit {
  bookerId: string = "";
  ownerId: string = "";
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  sideNavStatus = false;
  selectedSlot: { day: string, slot: string } | null = null;
  currentWeekStart: moment.Moment = moment().startOf('week'); // Start of current week
  isSchedulePageVisible: boolean = false;
  selectedInterviewType: string | null = null;
  isKindOfPracticePageVisible: boolean = false;
  selectedKindOfInterviewType: string[] | null = null;
  istheSlotSelected: boolean = false;
  isTheSelectedInterviewType: boolean = false;
  isTheSelectedkindOfInterviewType: boolean = false;
  availableSlots: { [date: string]: { slotStart: Date; slotEnd: Date }[] } = {};
  availability!: Availability[];
  kindOfInterview: string[] = [
    'Data Structures and algorithms',
    'System Design',
    'Java',
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
  interviewSlots: any;
  invitationForm: FormGroup;
  datesWithSlots: { date: string; slots: { slotStart: Date; slotEnd: Date; }[] }[] = [];

  interviewBalance!: number;
  username: string = '';
  isLoggedIn = false;

  constructor(private modalService: NgbModal,
    public interviewService: InterviewService, private eventService: CalendarService,
    private router: Router, public authService: AuthService,
    private jwtService: JwtService,
    private fb: FormBuilder) {
    this.getAllSlotsExceptLoggedInUser();

    this.invitationForm = this.fb.group({
      friendEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });

  }

  ngOnInit(): void {
    this.getAvailableInterviewSLots();
    this.generateDatesWithSlots();
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getUserNameFromToken(token);
      console.log("this.username  ",this.username );
      
    }

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

  isKindOfInterviewAvailable(kind: string): boolean {
    // Replace with logic to check availability
    return kind === 'Java'; // Example: AI Mock is unavailable
  }
  isSlotAvailable(date: string, slot: { slotStart: Date, slotEnd: Date }): boolean {
    const offsetIST = 5 * 60 + 30; // IST is UTC +5:30 (5 hours 30 minutes)

    // Combine the provided date with the slot's start time (UTC) to form a complete Date object.
    let dateTime = new Date(date + 'T' + slot.slotStart.toISOString().substring(11, 19));

    // Adjust the dateTime for IST by adding the offset
    dateTime = new Date(dateTime.getTime());

    // Retrieve available slots for this date
    const slotsForDate = this.getAllAvailableSlotsByDate(date);

    // Check if any slot in available slots matches the given time range
    return slotsForDate && slotsForDate.some((availableSlot: { slotStart: string | number | Date; slotEnd: string | number | Date; }) => {
      const slotStart = new Date(availableSlot.slotStart);
      const slotEnd = new Date(availableSlot.slotEnd);

      // Adjust available slot times for IST
      const slotStartIST = new Date(slotStart.getTime() - offsetIST * 60 * 1000);
      const slotEndIST = new Date(slotEnd.getTime() - offsetIST * 60 * 1000);

      // Check if the adjusted dateTime is within the range of the adjusted slotStart and slotEnd
      return dateTime >= slotStartIST && dateTime < slotEndIST;
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
      const slots = this.generateAllAvailableSlotsForDate(date);
      this.datesWithSlots.push({ date: formattedDate, slots: slots });
      console.log("datesWithSlots", this.datesWithSlots);
    }
  }
  generateAllAvailableSlotsForDate(date: Date, slotDuration: number = 30): { slotStart: Date, slotEnd: Date }[] {
    const allAvailableSlots: { slotStart: Date, slotEnd: Date }[] = [];

    // Define the start time (morning 8 am) and end time (night 8 pm)
    const start = new Date(date.setHours(8, 0, 0, 0));  // Set to 8 AM
    const end = new Date(date.setHours(20, 0, 0, 0));   // Set to 8 PM

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

      // Add the slot to the available slots list
      allAvailableSlots.push({ slotStart: new Date(currentSlot), slotEnd });

      // Move to the next slot by adding the duration
      currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
    }

    return allAvailableSlots; // Return the available slots for this date
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
    this.istheSlotSelected = true;
    console.log("Selected Slot:", new Date(this.selectedSlot.slot));
  }


  openBookingModal(content: any) {
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
      data.slot = this.selectedSlot.slot;
      data.day = this.selectedSlot.day;
      console.log("Selected slot and day:", this.selectedSlot);
      Swal.fire({
        icon: 'info',
        title: 'Slot Selected',
        text: `Slot: ${data.slot}, Day: ${data.day}`,
      });
    }

    if (this.selectedInterviewType) {
      data.interviewType = this.selectedInterviewType;
      console.log("Selected Interview Type:", this.selectedInterviewType);
    }

    if (data.interviewType === 'Practice with experts') {
      console.log("Selected interview type is 'Practice with experts'");
      console.log("Selected slot for filtering:", this.selectedSlot);
      data.selectedKindOfInterviewType = this.selectedKindOfInterviewType;
      console.log("data inf of interview", data);


      const eligibleUsers = this.filterEligibleUsers(
        this.availability,
        this.selectedKindOfInterviewType || [], // Fallback to an empty array if null
        this.selectedSlot
      );

      console.log("Filtered Eligible Users:", eligibleUsers);

      if (eligibleUsers.length > 0) {
        const randomUser = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
        const randomUserEmail = randomUser.scheduleUser.emailAdd;
        console.log("Random Eligible User:", randomUser);
        console.log(`Random eligible user email: ${randomUserEmail}`);

        Swal.fire({
          icon: 'success',
          title: 'Random User Found',
          text: `Random User Email: ${randomUserEmail}`,
        });

        data.hrEmail = randomUserEmail;
        data.status = "SCHEDULED";
      } else {
        console.warn("No eligible users found");
        Swal.fire({
          icon: 'warning',
          title: 'No Eligible Users',
          text: 'Could not find any eligible users for this slot.',
          showCancelButton: true,
          confirmButtonText: 'Request Slot',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
           console.log(" requesting slot ... ");
           
          }
        });
        return; // Stop execution if no eligible users are found
      }
    }

    if (this.selectedKindOfInterviewType) {
      data.kindOfInterviewType = this.selectedKindOfInterviewType;
      console.log("Selected Kind of Interview Type:", this.selectedKindOfInterviewType);
    } console.log(" selected interview type ", this.selectedInterviewType);


    console.log('Current interview type:', this.selectedInterviewType);

    // Log the current value of selectedInterviewType for debugging
    console.log('Current interview type:', this.selectedInterviewType);

    if (this.selectedInterviewType === 'Practice with Friends') {
      // Check if the friend's email is valid
      if (this.invitationForm.get('friendEmail')?.valid) {
        data.hrEmail = this.invitationForm.get('friendEmail')?.value;
        console.log("Friend's Email Added:", data.hrEmail);
        Swal.fire({
          icon: 'info',
          title: 'Friend Email Added',
          text: `Friend's Email: ${data.hrEmail}`,
        });
      } else {
        console.warn("Friend's email is not valid");
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: "Friend's email is not valid. Please check the email address.",
        });
        return; // Stop execution if the email is invalid
      }
    } else {
      // If interview type is not "Practice with Friends", don't check email
      console.log("Selected interview type is not 'Practice with Friends', skipping email validation.");
    }



    console.log("Data before removing booked slot:", data);

    // Remove the booked slot before saving the schedule
    this.removeBookedSlotFromAppointment(data.day, data.slot, data.hrEmail)
      .then(() => {
        console.log("Slot removed successfully, proceeding to save schedule.");

        this.interviewService.saveinterviewSlot(data).subscribe(
          (res) => {
            console.log("Interview service response:", res);
            Swal.fire({
              icon: 'success',
              title: 'Interview Scheduled',
              text: 'Interview slot saved successfully!',
            });
            this.modalService.dismissAll();
          },
          (err) => {
            console.error("Error saving interview slot:", err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to schedule the interview. Please try again.',
            });
          }
        );
      })
      .catch((error) => {
        console.error("Error removing slot:", error);
        Swal.fire({
          icon: 'error',
          title: 'Slot Removal Failed',
          text: 'Failed to remove the booked slot. Cannot proceed with scheduling.',
        });
      });

    console.log("Final Selected Data:", data);
  }



  removeBookedSlotFromAppointment(date: string, slotToRemove: Date, email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log("Slot to remove:", slotToRemove);

        // Ensure slotToRemove is a Date object
        if (!(slotToRemove instanceof Date)) {
          slotToRemove = new Date(slotToRemove);
        }

        // Validate that the slotToRemove is a valid date
        if (isNaN(slotToRemove.getTime())) {
          Swal.fire("Error", "Invalid slot format provided.", "warning");
          reject("Invalid slot format");
          return;
        }

        // Find the matching date in the availability list
        const dateWithSlots = this.availability.find(d => {
          const eventStart = new Date(d.start[0], d.start[1] - 1, d.start[2], d.start[3], d.start[4]);

          // Normalize both date to a comparable format (ISO strings) for better precision and timezone handling
          const eventStartNormalized = eventStart.toISOString().split('.')[0]; // Remove milliseconds
          const slotToRemoveNormalized = slotToRemove.toISOString().split('.')[0]; // Remove milliseconds

          console.log(`Event Start Normalized: ${eventStartNormalized}`);
          console.log(`Slot To Remove Normalized: ${slotToRemoveNormalized}`);

          return eventStartNormalized === slotToRemoveNormalized;
        });

        if (dateWithSlots) {
          const eventStart = new Date(dateWithSlots.start[0], dateWithSlots.start[1] - 1, dateWithSlots.start[2], dateWithSlots.start[3], dateWithSlots.start[4]);
          const eventStartNormalized = eventStart.toISOString().split('.')[0]; // Remove milliseconds
          const slotToRemoveNormalized = slotToRemove.toISOString().split('.')[0]; // Remove milliseconds

          // Compare the normalized eventStart and slotToRemove (without milliseconds)
          if (eventStartNormalized === slotToRemoveNormalized) {
            console.log(`Slot found, attempting to remove: ${slotToRemoveNormalized}`);

            // Update the appointment status
            this.eventService.updateAppointmentEvent(dateWithSlots.eventId, { status: 'BOOKED', bookedBy: email })
              .subscribe({
                next: res => {
                  if (res.status === 'SUCCESS') {
                    // Successfully booked, resolve the promise
                    console.log("Appointment updated successfully.");
                    resolve();
                  } else {
                    // Failed to update the appointment
                    console.error("Failed to update appointment status.");
                    reject("Failed to update appointment status.");
                  }
                },
                error: err => {
                  // Error occurred during update
                  console.error("Error updating appointment:", err);
                  reject("Error updating appointment: " + err);
                }
              });

            // Update the local availability object
            dateWithSlots.status = 'BOOKED';
            dateWithSlots.bookedBy = email;
          } else {
            // Slot mismatch warning
            console.warn("Slot mismatch: the provided slot does not match the event's start time.");
            Swal.fire("Warning", "Slot details do not match. Please verify.", "warning");
            reject("Slot mismatch");
          }
        } else {
          // No slots available for the provided date
          console.warn("No availability found for the provided date.");
          Swal.fire("Warning", "No slots available for the provided date.", "warning");
          reject("No availability found");
        }
      } catch (error) {
        // General error handling
        console.error("Error in removeBookedSlotFromAppointment:", error);
        reject(error);
      }
    });
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
    this.isKindOfPracticePageVisible = true;
  }
  hideKindOfPracticePage() {
    this.isKindOfPracticePageVisible = false;
    this.isSchedulePageVisible = true;
  }
  toggleSelection(item: string) {
    if (this.selectedInterviewType === item) {
      this.selectedInterviewType = null; // Deselect item if already selected
      this.isTheSelectedInterviewType = false;
    } else {
      this.selectedInterviewType = item; // Select item
      this.isTheSelectedInterviewType = true;
    }
  }

  onSelectInterviewType(item: string): void {
    this.selectedInterviewType = item;
  }
  isSelectedInterviewType(item: string): boolean {
    return this.selectedInterviewType === item;
  }
  isSelectedkindOfInterviewType(item: string): boolean {
    // Check if the item is in the selectedKindOfInterviewType array
    return this.selectedKindOfInterviewType?.includes(item) ?? false;
  }

  toggleKindOfSelection(item: string): void {
    if (!this.selectedKindOfInterviewType) {
      // Initialize the array if it's null
      this.selectedKindOfInterviewType = [];
    }

    const index = this.selectedKindOfInterviewType.indexOf(item);

    if (index > -1) {
      // Item is already selected; deselect it
      this.selectedKindOfInterviewType.splice(index, 1);
    } else {
      // Item is not selected; add it to the array
      this.selectedKindOfInterviewType.push(item);
    }

    // Optionally, you can log the current selection for debugging
    console.log("Updated selectedKindOfInterviewType:", this.selectedKindOfInterviewType);
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

  getAvailableInterviewSLots() {
    this.eventService.getAllInterviewSlotsExceptLogedInUser().subscribe(res => {
      this.availability = res;
      console.log("available interview slots in compo ", this.availability);

    })
  }

  filterEligibleUsers(
    data: any[],
    skills: string[],
    selectedSlot: { day: string; slot: string } | null
  ): any[] {
    const offsetIST = 5 * 60 + 30; // IST Offset in minutes
    console.log("Filtering users ", data);

    if (!selectedSlot) {
      console.warn("No selected slot provided");
      return [];
    }

    // Parse the selected slot's date and time and adjust for IST offset
    const selectedSlotTime = new Date(
      new Date(selectedSlot.slot).getTime() + offsetIST * 60 * 1000
    );

    return data.filter((event) => {
      // Convert the start time from the event to a Date object
      const eventStart = new Date(
        event.start[0], // Year
        event.start[1] - 1, // Month (0-based)
        event.start[2], // Day
        event.start[3], // Hour
        event.start[4], // Minute
        event.start[5] // Second
      );

      // Adjust event start time for IST
      const eventStartIST = new Date(eventStart.getTime() + offsetIST * 60 * 1000);

      // Check if skills match (case-insensitive)
      console.log("Looking for ", skills, " available ", event.skills);

      const skillsMatch = event.skills.some((skill: string) =>
        skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
      );

      if (skillsMatch) {
        console.log(`Skills matched for event: ${JSON.stringify(event)}`);
      }

      // Check if the slot time matches
      const slotTimeMatch = eventStartIST.getTime() === selectedSlotTime.getTime();
      console.log(`eventStartIST: ${eventStartIST}, selectedSlotTime: ${selectedSlotTime}`);

      if (slotTimeMatch) {
        console.log(`Slot time matched for event: ${JSON.stringify(event)}`);
      }

      // Log when both conditions are met
      if (skillsMatch && slotTimeMatch) {
        console.log(`Both conditions matched for event: ${JSON.stringify(event)}`);
      }

      return skillsMatch && slotTimeMatch;
    });
  }


  getAllSlotsExceptLoggedInUser() {
    this.eventService.getAllInterviewSlotsExceptLogedInUser().subscribe((res) => {
      console.log("all slots", res);
      this.interviewSlots = res.data.data;
      this.interviewBalance = Math.floor(res.data.coinBalance / 26);
      console.log("interview Balance ", this.interviewBalance);
      console.log("all slots ", res);
      if (this.interviewSlots.length == 0) {
        Swal.fire("Info", "No Upcoming Interviews Found", 'info');
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
      console.log('No Non canceled slots found');
      return [];
    }
    return slots.filter(slot => slot.status !== 'CANCELED');
  }
  getCanceledSlots(slots: any[]): any[] {
    if (!slots) {
      console.log('No canceled slots found');
      return [];
    }
    return slots.filter(slot => slot.status === 'CANCELED');
  }
  // Sample Availability Data
  availableSlotswithid: { slotStart: Date, slotEnd: Date }[] = [];
  selectedEventId: number | null = null;


  public toDate(dateArray: number[]): Date {
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
  }

  getAllAvailableSlotsByDate(date: string, slotDuration: number = 30): { slotStart: Date, slotEnd: Date }[] {
    // Ensure availability is defined and initialized
    if (!this.availability || !Array.isArray(this.availability)) {
      console.warn('Availability is not defined or not an array.');
      return [];
    }
  
    const allAvailableSlotsForDate: { slotStart: Date, slotEnd: Date }[] = [];
  
    // Convert the string date to a Date object representing the start of the day (00:00)
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Start of the day
  
    // Calculate the end of the day (23:59:59.999)
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999); // End of the day
  
    // Iterate through each availability entry
    this.availability.forEach((availability) => {
      const start = this.toDate(availability.start);
      const end = this.toDate(availability.end);
  
      // Validate that start and end are valid Date objects
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn('Invalid availability dates detected:', availability);
        return; // Skip invalid entries
      }
  
      // Check if the availability overlaps with the target date
      if (start <= endOfDay && end >= targetDate) {
        let currentSlot = new Date(start);
  
        // Adjust currentSlot to the nearest available half-hour
        if (currentSlot.getMinutes() > 0 && currentSlot.getMinutes() < 30) {
          currentSlot.setMinutes(30, 0, 0); // Set to :30
        } else if (currentSlot.getMinutes() >= 30) {
          currentSlot.setHours(currentSlot.getHours() + 1, 0, 0, 0); // Set to next hour
        }
  
        // Loop through the available slots until the end time
        while (currentSlot < end && currentSlot <= endOfDay) {
          const slotEnd = new Date(currentSlot);
          slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration); // Add duration to get slot end time
  
          // Break if the slot end time exceeds the availability range or the end of the day
          if (slotEnd > end || slotEnd > endOfDay) {
            break;
          }
  
          // Check if this slot is already booked
          const isBooked = this.availability.some((bookedSlot) => {
            const bookedSlotStart = this.toDate(bookedSlot.start);
            const bookedSlotEnd = this.toDate(bookedSlot.end);
  
            // Validate that bookedSlotStart and bookedSlotEnd are valid Date objects
            if (isNaN(bookedSlotStart.getTime()) || isNaN(bookedSlotEnd.getTime())) {
              console.warn('Invalid booked slot dates detected:', bookedSlot);
              return false;
            }
  
            // Check for overlap with booked slots
            return (
              bookedSlot.status === 'BOOKED' &&
              bookedSlotStart < slotEnd &&
              bookedSlotEnd > currentSlot
            );
          });
  
          // If the slot is not booked, add it to the list
          if (!isBooked) {
            allAvailableSlotsForDate.push({
              slotStart: new Date(currentSlot),
              slotEnd: new Date(slotEnd),
            });
          }
  
          // Move to the next slot (add slot duration to currentSlot)
          currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
        }
      }
    });
  
    return allAvailableSlotsForDate; // Return all available slots for the specified date
  }
  

}
