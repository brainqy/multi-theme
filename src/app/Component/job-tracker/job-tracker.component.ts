
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

openModal() {
  const modalRef = this.modalService.open(ModalComponent);
  modalRef.result.then((result) => {
    if (result) {
      const newJob: Job = {
        jobRole: result.jobTitle,
        jobLocation: result.jobLocation,
        company: result.companyName,
        status: 'saved'
      };
      this.saved.push(newJob);
      this.jobService.createJob(newJob).subscribe(); // Call backend to create job
    }
  }, (reason) => {
    console.log(reason); // Handle modal dismiss reason
  });
}

generateId(): number {
  const ids = this.jobs.map(job => job.id).filter((id): id is number => id !== undefined);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
}
}
