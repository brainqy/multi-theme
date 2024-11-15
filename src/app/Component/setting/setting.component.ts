import { Component } from '@angular/core';
import { SecretService } from 'src/app/Core/services/secret.service';
import { ThemeService } from 'src/app/Core/services/theme.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  sideNavStatus: boolean = true;
  selectedTheme!: string;
 // themes: string[];
 openaiSecret: string = ''; // Variable to store the secret
 gmailSecret: string = ''; // Variable to store the secret
 openAiSecretKey: string = 'openaiKey'; // Variable to store the secret
 gmailSecretKey: string = 'gmailApiKey'; // Variable to store the secret
 themes: string[] = ['light', 'dark'];

  constructor(private themeService: ThemeService,private theme: ThemeService,
    private secretService: SecretService) {
    const selectedTheme = localStorage.getItem('selectedTheme');
    this.themes = this.themes;
    console.log("this.themes",this.themes);
  }

ngOnInit(): void {
}

public switchTheme(): void {
  if (this.theme.current === 'light') {
      this.theme.current = 'dark';
  } else {
      this.theme.current = 'light';
  }
}
saveOpenAISecret() {
  if (this.openaiSecret && this.openAiSecretKey) { // Ensure both key and secret are provided
    // Ask for confirmation before saving
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to save the secret.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.secretService.saveSecret(this.openAiSecretKey, this.openaiSecret).subscribe(
          response => {
            console.log('Secret saved successfully', response);
            Swal.fire("Success", "Secret updated", 'success');
          },
          error => {
            console.error('Error saving secret', error);
            Swal.fire("Error", "Failed to save secret", 'error');
          }
        );
      } else {
        console.log('Secret save operation was canceled.');
        Swal.fire("Canceled", "Secret save operation was canceled", 'info');
      }
    });
  } else {
    console.log('Key or secret is empty. Please enter valid values.');
    Swal.fire("Warning", "Key and secret cannot be empty", 'warning');
  }
}


saveGmailSecret(): void {
  if (this.gmailSecret && this.gmailSecretKey) { // Ensure both key and secret are provided
    // Ask for confirmation before saving
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to save the Gmail secret.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.secretService.saveSecret(this.gmailSecretKey, this.gmailSecret).subscribe(
          response => {
            console.log('Secret saved successfully', response);
            Swal.fire("Success", "Secret updated", 'success');
          },
          error => {
            console.error('Error saving secret', error);
            Swal.fire("Error", "Failed to save secret", 'error');
          }
        );
      } else {
        console.log('Secret save operation was canceled.');
        Swal.fire("Canceled", "Secret save operation was canceled", 'info');
      }
    });
  } else {
    console.log('Key or secret is empty. Please enter valid values.');
    Swal.fire("Warning", "Key and secret cannot be empty", 'warning');
  }
}
openopenaiHelpModal(): void {
  const modalElement = document.getElementById('gmailHelpModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
opengmailHelpModal(): void {
  const modalElement = document.getElementById('openaiHelpModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
availability = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  startTime: '',
  endTime: ''
};
weekDays = [
  { name: 'Mon', date: 6, selected: false },
  { name: 'Tue', date: 7, selected: true }, // default selected
  { name: 'Wed', date: 8, selected: false },
  { name: 'Thu', date: 9, selected: false },
  { name: 'Fri', date: 10, selected: false },
  { name: 'Sat', date: 11, selected: false },
  { name: 'Sun', date: 12, selected: false }
];

timeSlots = [
  { time: '08:30', selected: false },
  { time: '09:30', selected: true }, // default selected
  { time: '10:30', selected: false },
  { time: '11:30', selected: false },
  { time: '12:30', selected: false },
  { time: '13:30', selected: false },
  { time: '14:30', selected: false },
  { time: '15:30', selected: false },
  { time: '16:30', selected: false },
  { time: '17:30', selected: false },
  { time: '18:30', selected: false }
];

selectedDate = this.weekDays.find(day => day.selected)?.date;
selectedTime = this.timeSlots.find(slot => slot.selected)?.time;

selectDate(day: any) {
  this.weekDays.forEach(d => d.selected = false);
  day.selected = true;
  this.selectedDate = day.date;
}

selectTime(slot: any) {
  this.timeSlots.forEach(t => t.selected = false);
  slot.selected = true;
  this.selectedTime = slot.time;
}

submitAvailability(): void {
  console.log('Availability Submitted:', this.availability);
  // Here, you can send the availability data to the backend or handle it accordingly
}
}
