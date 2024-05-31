
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Job, JobService } from 'src/app/Core/services/job.service';

@Component({
  selector: 'app-job-tracker',
  templateUrl: './job-tracker.component.html',
  styleUrls: ['./job-tracker.component.scss']
})
export class JobTrackerComponent {
  //8830142847
  saved: Job[] = [];
  applied: Job[] = [];
  interview: Job[] = [];
  offer: Job[] = [];
  jobs: Job[] = [];

constructor(private modalService: NgbModal,private jobService:JobService) {}

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

    this.jobService.updateJobStatus(droppedItem).subscribe((res)=>{
      console.log("res",res);
      
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
    this.jobService.getJobById(job.id).subscribe((res) => {
      const jobToUpdate = res; // Assuming the response contains the full job object
      console.log('Job fetched:', jobToUpdate);
      modalRef.componentInstance.job = jobToUpdate;
      console.log('Job set in modal instance:', modalRef.componentInstance.job);
    });
  } else {
    console.log('No job ID provided. Opening modal for new job.');
  }

  modalRef.result.then((result) => {
    console.log('Modal closed with result:', result);

    if (result) {
      if (job) {
        // Update existing job
        job.jobRole = result.jobRole;
        job.jobLocation = result.jobLocation;
        job.company = result.company;
        job.jobListingUrl = result.jobListingUrl;
        job.salary = result.salary;
        job.dateSpecified = result.dateSpecified;
        job.jobDescription = result.jobDescription;

        console.log('Updating job...', job);
        this.jobService.updateJobStatus(job).subscribe((res) => {
          console.log('Update completed:', res);
        });
      } else {
        // Create new job
        const newJob: Job = {
          jobRole: result.jobRole,
          jobLocation: result.jobLocation,
          company: result.company,
          status: 'saved',
          jobListingUrl: result.jobListingUrl,
          salary: result.salary,
          dateSpecified: result.dateSpecified,
          jobDescription: result.jobDescription
        };

        console.log('Creating new job:', newJob);
        this.saved.push(newJob);
        this.jobService.createJob(newJob).subscribe(job => {
          this.saved = this.saved.map(j => j.id === newJob.id ? job : j);
          console.log('New job created:', job);
        });
      }
    }
  }, (reason) => {
    console.log('Modal dismissed with reason:', reason);
  });
}


}
