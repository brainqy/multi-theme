
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Job, JobService } from 'src/app/Core/services/job.service';
import { DmComponent } from './dm/dm.component';
import { InterviewService } from 'src/app/Core/services/interview.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-job-tracker',
  templateUrl: './job-tracker.component.html',
  styleUrls: ['./job-tracker.component.scss']
})
export class JobTrackerComponent {
  saved: Job[] = [];
  applied: Job[] = [];
  interview: Job[] = [];
  offer: Job[] = [];
  jobs: Job[] = [];
  jobToUpdate!: Job;
  slotInterviews:any;

  constructor(private modalService: NgbModal, private jobService: JobService,
    private interviewService:InterviewService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs.filter(job => job.status === 'jobs');
      this.saved = jobs.filter(job => job.status === 'saved');
      this.applied = jobs.filter(job => job.status === 'applied');
      this.interview = jobs.filter(job => job.status === 'interview');
      this.offer = jobs.filter(job => job.status === 'offer');
    });
  }

  drop(event: CdkDragDrop<Job[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const droppedItem = event.previousContainer.data[event.previousIndex];
      droppedItem.status = this.getStatus(event.container.id);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      this.jobService.updateJobStatus(droppedItem).subscribe((res) => {
        console.log("res", res);
      });
    }
  }

  getStatus(containerId: string): string {
    switch (containerId) {
      case 'saved':
        return 'saved';
      case 'applied':
        return 'applied';
      case 'interview':
        return 'interview';
      case 'offer':
        return 'offer';
      case 'jobs':
        return 'jobs';
      default:
        return '';
    }
  }

  openModal(job?: Job) {
    const modalRef = this.modalService.open(ModalComponent);
  
    if (job && job.id !== undefined) {
      console.log('Fetching job by ID:', job.id);
      
      // Using forkJoin to handle multiple API calls
      forkJoin({
        jobData: this.jobService.getJobById(job.id),
        interviewSlots: this.interviewService.getAllInterviewSlotsByJobId(job.id)
      }).subscribe(({ jobData, interviewSlots }) => {
        console.log("Job fetched:", jobData);
        console.log("All slots:", interviewSlots);
  
        this.jobToUpdate = jobData.data; // Assuming the response contains the full job object
        this.slotInterviews = interviewSlots.data;
  
        // Pass data to the modal
        modalRef.componentInstance.job = this.jobToUpdate;
        modalRef.componentInstance.interviews = this.slotInterviews;
  
        console.log('Job set in modal instance:', modalRef.componentInstance.job);
        console.log('Interviews set in modal instance:', modalRef.componentInstance.interviews);
      });
    } else {
      console.log('No job ID provided. Opening modal for new job.');
      modalRef.componentInstance.job = null; // Ensure null is explicitly set
      modalRef.componentInstance.interviews = []; // Initialize with empty array
    }
  
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
  
      if (result) {
        if (job) {
          // Update existing job
          Object.assign(job, result);
          console.log('Updating job...', job);
  
          this.jobService.updateJobStatus(job).subscribe((res) => {
            console.log('Update completed:', res);
          });
        } else {
          // Create new job
          const newJob: Job = {
            ...result,
            status: 'saved'
          };
  
          console.log('Creating new job:', newJob);
          this.saved.push(newJob);
  
          this.jobService.saveJob(newJob).subscribe(job => {
            this.saved = this.saved.map(j => j.id === newJob.id ? job : j);
            console.log('New job created:', job);
          });
        }
      }
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
  getAllSlotsByJobId(jobId:any){
    this.interviewService.getAllInterviewSlotsByJobId(jobId).subscribe((res)=>{
      console.log("all slots",res);
    })
  }
}
