import { Component, NgZone } from '@angular/core';
import { Candidate, InterviewBuddyService } from 'src/app/Core/services/interview-buddy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interview-matcher',
  templateUrl: './interview-matcher.component.html',
  styleUrls: ['./interview-matcher.component.css']
})
export class InterviewMatcherComponent {
  progress: number = 0;
  intervalId: any;
  sideNavStatus: boolean = false;
  userSkillSet: string[] = ['Django', 'Flask', 'MongoDB']; // Example user skill set
  userExperience: number = 3; // Example user experience
  matchedBuddy!: Candidate | null;

  constructor(private interviewService: InterviewBuddyService) {}
  toggleTimeSlot(timeSlot: any) {
    timeSlot.available = !timeSlot.available;
  }

  findBuddy() {
    // Call the service to find a buddy based on the user's input
    this.matchedBuddy = this.interviewService.findBuddy(this.userSkillSet, this.userExperience);
    console.log("this Buddy" ,this.matchedBuddy);
  }


  startProgress() {
    this.progress = 0; // Reset progress
    const intervalDuration = 1000 / 60; // 60 fps
    const totalSteps = 100;
    const increment = 1;
    const totalDuration = 1000; // 1 second

    const step = () => {
      if (this.progress < 100) {
        this.progress += increment; // Increment progress
        requestAnimationFrame(step); // Request the next frame
      }
    };

    const intervalStep = () => {
      const steps = Math.ceil(totalDuration / intervalDuration);
      const progressIncrement = totalSteps / steps;
      this.intervalId = setInterval(() => {
        if (this.progress < 100) {
          this.progress += progressIncrement; // Increment progress
        } else {
          clearInterval(this.intervalId); // Stop the interval when progress reaches 100%
        }
      }, intervalDuration);
    };

    // Start the animation
    requestAnimationFrame(step); // Use requestAnimationFrame for smooth animation
    // Alternatively, you can use intervalStep() for a less smooth but consistent animation
    this.matchedBuddy = this.interviewService.findBuddy(this.userSkillSet, this.userExperience);
    console.log("this Buddy" ,this.matchedBuddy);
  } 
  scheduleInterview() {
    // Filter the selected time slots
    const selectedTimeSlots = (this.matchedBuddy?.timeSlots || []).filter(timeSlot => timeSlot.available);
  console.log("timeslots ",selectedTimeSlots);
  Swal.fire('Info',"Are you sure you want to confirn this interview "+JSON.stringify(selectedTimeSlots),'info');
    // Perform further actions such as sending the selected time slots to the backend for scheduling
  }
}
