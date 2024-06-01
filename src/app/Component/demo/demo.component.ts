import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DmComponent } from '../job-tracker/dm/dm.component';
import { Job, JobService } from 'src/app/Core/services/job.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  jobToUpdate!: Job;

  toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    } else {
      navbarCollapse?.classList.add('show');
    }
  }

  attribute = { name: 'dnyaneshwar Name', value: 'Attribute Value' };

  constructor(private modalService: NgbModal,private jobService:JobService) { }

  openModal() {
    this.jobService.getJobById(1).subscribe((res) => {
      this.jobToUpdate = res; // Assuming the response contains the full job object
     console.log('Job fetched:', this.jobToUpdate);
     const modalRef = this.modalService.open(DmComponent);
     modalRef.componentInstance.job = this.jobToUpdate;
     console.log('Job set in modal instance:', modalRef.componentInstance.job);
   });
  }
}
