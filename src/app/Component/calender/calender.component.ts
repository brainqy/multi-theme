import { parseISO } from 'date-fns';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { FormBuilder, NgForm, NgModel, Validators } from '@angular/forms';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { CalendarService } from 'src/app/Core/services/calendar.service';
import { User } from 'src/app/Model/User';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Core/services/auth.service';
import { UsersService } from 'src/app/Core/services/users.service';
import { IcsRequest } from 'src/app/Core/services/transaction.service';
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
  sideNavStatus: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  trainerSearchTerm: string = '';
  selectedTrainer!: any;
  allTrainers: any = [];
  emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  event!: CalendarEvent;
  private searchTerms = new Subject<string>();

  view: CalendarView = CalendarView.Month;
  monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  CalendarView = CalendarView;
  currentMonth: string = '';
  currentYear: number = 0;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();
  selectedDate: string = '';
  editedEvent: any = {
    title: '',
    start: new Date(),
    end: new Date(),
    color: colors['']
  };
  trainer: any;
allEventData: any;

  onDateSelect(date: string) {
    this.selectedDate = date;
  }
  getPrimaryColor(event: CalendarEvent): string {
    return event?.color?.primary || '#1e90ff';
  }
  getSecondaryColor(event: CalendarEvent): string {
    return event?.color?.secondary || '#1e90ff';
  }
  getSecondaryTextColor(event: CalendarEvent): string {
    return event?.color?.secondaryText || '#1e90ff';
  }
  events: CalendarEvent[] = [];


  activeDayIsOpen: boolean = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private modal: NgbModal, private calendarService: CalendarService, private userService: UsersService) { 
    this.fetchAllEvents();
  }
  ngOnInit() {
    console.log("Fetching all events");
    this.fetchAllTrainers();
    this.populateWeekDays();
    // console.log(" this.fetchAllTrainers(): ", JSON.stringify(this.fetchAllTrainers()));
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.calendarService.searchByTrainer(term))
    )
      .subscribe((events) => {
        this.events = events;
      })
      const today = new Date();
      this.currentMonth = this.monthNames[today.getMonth()];  // Get the current month name as a string
      this.currentYear = today.getFullYear();  // Get the current year
  
  }

  onTrainerSearchChange(): void {
    this.searchTerms.next(this.trainerSearchTerm);
  }
  ngOnDestroy() {
    this.searchTerms.unsubscribe();
  }
  fetchAllEvents() {
    console.log("Fetching all events");
    this.calendarService.getAllEventsExceptLoggedIn().subscribe(
      (response: any) => {
        console.log("Response from server:", response);
        if (response) {
          this.allEventData=response;
          this.events = response.map((event: any) => ({
            ...event,
            start: new Date(event.start[0], event.start[1] - 1, event.start[2], event.start[3], event.start[4]),
            end: new Date(event.end[0], event.end[1] - 1, event.end[2], event.end[3], event.end[4])
          }));
         // console.log("this events from server ", JSON.stringify(this.events))
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        Swal.fire("ERROR", "Error fetching events", 'error');
        console.error('Error fetching events:', error);
      }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  formatDate(dateArray?: number[]): string {
    if (!dateArray || dateArray.length < 5) {
      return 'Invalid date';
    }
  
    const [year, month, day, hour, minute] = dateArray;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
  
  
  updateEvent(editedEvent: any) {

    this.calendarService.updateEvent(editedEvent.eventId, editedEvent).subscribe((res) => {

      Swal.fire('SUCESS', "Event Updated Successfully", 'success');
      console.log("Event updated successfully in update event");

    })
    this.modal.dismissAll();
  }
  eventModal(content: any, eventToEdit: any) {
    this.calendarService.getEventById(eventToEdit.eventId).subscribe(
      (previousEvent: any) => {
        this.editedEvent = { ...previousEvent, trainerEmail: previousEvent.scheduleUser.emailAdd, start: previousEvent.start, end: previousEvent.end };
        this.modal.open('editEventModal', { size: 'lg' });
        console.log("start date value ", JSON.stringify(this.editedEvent));
      }, (error) => {
        console.error("error fetching previous event details", error);
      }
    )
    this.modal.open(content, { size: 'lg' });
  }
  deleteEvent(eventToDelete: any) {
    if (eventToDelete !== undefined) {
      this.events = this.events.filter((event) => event !== eventToDelete);
      this.calendarService.deleteEvent(eventToDelete.eventId).subscribe(
        (res) => {
          console.log('event deleted successfully !')
        }, (error) => {
          console.error('Error deliting event ', error);
        }
      )
    }

  }
  searchEventsByTrainer(trainer: any): void {
    console.log("TrainerEmail id is ::: ", JSON.stringify(trainer));
    this.calendarService.searchByTrainer(trainer).subscribe(
      (response: any) => {
        console.log("Response from server:", response);
        if (response) {
          this.events = response.data.map((event: any) => ({
            ...event,
            start: new Date(event.start[0], event.start[1] - 1, event.start[2], event.start[3], event.start[4]),
            end: new Date(event.end[0], event.end[1] - 1, event.end[2], event.end[3], event.end[4])
          }));
          Swal.fire("ERROR", JSON.stringify(this.events), 'error');
          console.log("this events from server ", JSON.stringify(this.events))
        } else {
          Swal.fire("ERROR", "Invalid response format", 'error');
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        Swal.fire("ERROR", "Error fetching events", 'error');
        console.error('Error fetching events:', error);
      }
    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openModal(content: any) {
    this.modal.open(content, { size: 'lg' });
  }
  newEventForm = this.formBuilder.group(
    {
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      trainerEmail: ['', [Validators.required, Validators.pattern(this.emailpattern)]],

    })
    requestData: IcsRequest = {
      eventName: 'Meeting Invitation',
      organizerName: 'Dnyanesg',
      organizerEmail: 'dvsomwanshi@gmail.com',
      attendees: ['brainqy@gmail.com'],
      subject: 'Meeting Subject',
      description: 'Meeting Description',
      location: 'Meeting Location',
      startTime: new Date('2024-03-01T03:30:00.000Z'),
      endTime: new Date('2024-03-01T04:30:00.000Z')
    };
    addInterviewSchedule(newInterviewFormValue: any) {
      if (newInterviewFormValue.attendees.includes(',')) {
        // If it contains a comma, split the string into an array
        newInterviewFormValue.attendees = newInterviewFormValue.attendees.split(',');
      } else {
        // If it doesn't contain a comma, assign it to an array with a single element
        newInterviewFormValue.attendees = [newInterviewFormValue.attendees];
      }
      console.log("newInterviewFormValue",newInterviewFormValue.value);
      this.calendarService.scheduleInterview(newInterviewFormValue).subscribe((res)=>{
        console.log("interview res created",res);

      })
      this.modal.dismissAll();
      // Your logic to add interview schedule goes here
    }
   // Utility function to get the numeric index of the month
   getMonthIndex(monthName: string): number {
    return this.monthNames.indexOf(monthName);  // Convert month name to numeric index (0-11)
  }

  addNewEvent(newEventForm: NgForm, modal: any) {
    if (newEventForm.valid) {
      // Check if selectedDate and selectedTime are set
      console.log("Selected Date: ", this.selectedDate);
      console.log("Selected Time: ", this.selectedTime);
      const recurrence = newEventForm.value.recurrence;
    console.log("Recurrence: ", recurrence);
  
      // Ensure selectedDate and selectedTime are valid
      if (!this.selectedDate || !this.selectedTime) {
        Swal.fire('Error', 'Please select a date and time!', 'error');
        return;
      }
  
      // Create the start date using selectedDate and selectedTime
      const eventDate = new Date();
      eventDate.setFullYear(this.currentYear);
  
      // Ensure selectedMonth is valid
      const monthIndex = this.getMonthIndex(this.currentMonth);
      if (monthIndex === -1) {
        console.error("Invalid Month: ", this.currentMonth);
        return;
      }
      eventDate.setMonth(monthIndex);  // Convert month string to numeric index
  
      // Ensure selectedDate is a valid number
      if (isNaN(Number(this.selectedDate))) {
        console.error("Invalid Date: ", this.selectedDate);
        return;
      }
      eventDate.setDate(Number(this.selectedDate));  // Set the date
  
      console.log("eventDate before setting time: ", eventDate);
  
      // Parse selectedTime (assumes time format "HH:MM AM/PM")
      if (this.selectedTime) {
        const timeParts = this.selectedTime.split(' '); // Split time and AM/PM
        if (timeParts.length === 2) {
          const [time, period] = timeParts;
          let [hours, minutes] = time.split(':').map(Number);
  
          // Adjust hours for AM/PM format
          if (period === 'AM' && hours === 12) {
            hours = 0;  // 12 AM is midnight
          } else if (period === 'PM' && hours !== 12) {
            hours += 12;  // Convert PM hour to 24-hour format
          }
  
          // Check if time values are valid
          if (isNaN(hours) || isNaN(minutes)) {
            console.error("Invalid Time Format: ", this.selectedTime);
            return;
          }
  
          // Set the time to the adjusted hours and minutes (local time first)
          eventDate.setHours(hours, minutes, 0);
  
          // Adjust to IST (UTC +5:30)
          const offsetIST = 5 * 60 + 30; // IST is UTC +5:30 (5 hours 30 minutes)
          const currentTimezoneOffset = eventDate.getTimezoneOffset(); // Get the browser's current timezone offset
          console.log("currentTimezoneOffset", currentTimezoneOffset);
  
          // Adjust the time to IST by adding the difference between UTC and IST
          eventDate.setMinutes(eventDate.getMinutes()+offsetIST);
           console.log(" data",JSON.stringify(eventDate));
          
        } else {
          console.error("Invalid Time Format: ", this.selectedTime);
          return;
        }
      }
  
      console.log("Event Start Date after setting time: ", eventDate);
  
      // Check if eventDate is valid
      if (isNaN(eventDate.getTime())) {
        console.error('Invalid Event Start Date');
        return;
      }
  
      // Set the end time to 1 hour after the start time
      const endDate = new Date(eventDate.getTime() + 30 * 60 * 1000); // 1/2-hour duration
      console.log("Event start Date: ", eventDate);
      console.log("Event End Date: ", endDate);
      const selectedSkills = this.primarySkills.filter(skill => skill.selected).map(skill => skill.skill);
      if (selectedSkills.length === 0) {
        Swal.fire('Error', 'Please select at least one skill!', 'error');
        return;
      }
      console.log("Selected Skills: ", selectedSkills);
  
      this.createRecurringEvents(eventDate, endDate, recurrence, selectedSkills);
      // Close the modal
      this.modal.dismissAll();
    }
  }
  // Helper method to handle recurrence
  createRecurringEvents(startDate: Date, endDate: Date, recurrence: string, selectedSkills: string[]) {
    let recurrenceCount = 5; // Example: Generate 5 occurrences for the selected recurrence
    let recurrenceDuration = 0;
    console.log("Recurrence: ", recurrence);
    
    if (!recurrence || recurrence === 'none') {
      // No recurrence, create only 1 event
      this.createEvent(startDate, endDate, selectedSkills); 
      return;
    }
  
    // Determine the recurrence duration in milliseconds
    switch (recurrence) {
      case 'daily':
        recurrenceDuration = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        break;
      case 'weekly':
        recurrenceDuration = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
        break;
      case 'monthly':
        recurrenceDuration = 30 * 24 * 60 * 60 * 1000; // Approx 1 month in milliseconds
        break;
      case 'yearly':
        recurrenceDuration = 365 * 24 * 60 * 60 * 1000; // Approx 1 year in milliseconds
        break;
      default:
        console.error("Invalid Recurrence Option");
        return;
    }
  
    // Generate recurring events
    for (let i = 0; i < recurrenceCount; i++) {
      const recurringStartDate = new Date(startDate.getTime() + (recurrenceDuration * i));
      const recurringEndDate = new Date(endDate.getTime() + (recurrenceDuration * i));
      
      // Create each recurring event, passing the selectedSkills along
      this.createEvent(recurringStartDate, recurringEndDate, selectedSkills);
    }
  }
  

// Helper method to create a single event
createEvent(startDate: Date, endDate: Date,selectedSkills: string[]) {
  const newEvent = {
    title: "AVAILABILITY",
    start: startDate,
    end: endDate,
    color: "#90dd1d",
    trainerEmail: 'trainer@example.com',
    skills:selectedSkills
  };

  // Call your event service to save the event
  this.calendarService.createEvent(newEvent).subscribe(
    (res) => {
      Swal.fire('Info', "Event Created Successfully", 'success');
      console.log("Response from creating event: ", res);
      this.events.push(res); // Add the event to the list
    },
    (error) => {
      console.error('Error creating event', error);
    }
  );
}

  // Helper method to format time into "HH:MM AM/PM"
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    let period = 'AM';
  
    let formattedHours = hours;
    if (formattedHours >= 12) {
      period = 'PM';
      if (formattedHours > 12) {
        formattedHours -= 12; // Convert to 12-hour format
      }
    } else if (formattedHours === 0) {
      formattedHours = 12; // Midnight case
    }
  
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  

  // Example of formatting time, assuming format like "HH:MM"
    
    
    
    
 
  fetchAllTrainers() {
    this.userService.getAllTrainers().subscribe(
      (trainers) => {
        console.log("trainers fetch : ", trainers);
        this.allTrainers = trainers.data;
        console.log("this.allTrainers : ", this.allTrainers);
      },
      (error) => {
        Swal.fire("Error",error.error,'error');
        //console.error('Error fetching trainers', error);
      }
    );
  }

  weekDays: { name: string; date: string; selected: boolean }[] = [];

  timeSlots = [
    { time: '09:00 AM', selected: false },
    { time: '10:00 AM', selected: false },
    { time: '11:00 AM', selected: false },
    { time: '12:00 PM', selected: false },
    { time: '01:00 PM', selected: false },
    { time: '02:00 PM', selected: false },
    { time: '03:00 PM', selected: false },
    { time: '04:00 PM', selected: false },
    { time: '05:00 PM', selected: false },
    { time: '06:00 PM', selected: false },
    { time: '07:00 PM', selected: false },
    { time: '08:00 PM', selected: false }
  ];

selectedSkills: string[] = []; // An array to hold selected skills

primarySkills = [
  { skill: 'java', selected: false },
  { skill: 'Microservices', selected: false },
  { skill: 'Angular', selected: false },
  { skill: 'AWS', selected: false },
  // Add more skills here
];

// Updated selectSkill method to toggle selection
selectSkill(skill: any) {
  // Toggle the selected state
  skill.selected = !skill.selected;

  // Add or remove skill from selectedSkills array
  if (skill.selected) {
    this.selectedSkills.push(skill.skill); // Add the skill to selectedSkills array
  } else {
    const index = this.selectedSkills.indexOf(skill.skill);
    if (index > -1) {
      this.selectedSkills.splice(index, 1); // Remove the skill from selectedSkills array
    }
  }
  console.log("Selected Skills: ", this.selectedSkills);
}



  selectedTime: string = '';
  selectedSkill: string = '';
  selectDate(day: any) {
    // Reset selection
    this.weekDays.forEach(d => (d.selected = false));
    day.selected = true;
    this.selectedDate = day.date;
  }

  selectTime(time: any) {
    // Reset selection
    this.timeSlots.forEach(t => (t.selected = false));
    time.selected = true;
    this.selectedTime = time.time;
  }
  populateWeekDays() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
      this.weekDays.push({
        name: currentDay.toLocaleString('en-US', { weekday: 'short' }), // e.g., Mon, Tue
        date: currentDay.getDate().toString(), // Day of the month
        selected: false
      });
    }
  }
}

export interface EventDto {
  event: CalendarEvent;
  trainerEmail: string;
}