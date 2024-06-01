import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { Job, JobService } from 'src/app/Core/services/job.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  jobRole: string = 'Job Title';
  company: string = 'Company Name';
  @Input() job: Job | null = null;
  jobForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private jobService: JobService
  ) {
    this.jobForm = this.formBuilder.group({
      jobRole: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobLocation: [''],
      company: ['', Validators.required],
      jobListingUrl: [''],
      salary: [''],
      dateSpecified: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    if (this.job) {
      console.log('Job received in modal:', this.job);
      this.jobForm.patchValue({
        jobRole: this.job.jobRole,
        jobDescription: this.job.jobDescription || '',
        jobLocation: this.job.jobLocation,
        company: this.job.company,
        jobListingUrl: this.job.jobListingUrl || '',
        salary: this.job.salary || '',
        dateSpecified: this.job.dateSpecified || '',
        status: this.job.status
      });
    } else {
      console.log('No job received in modal.');
    }
  }

  save() {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
      jobData.id = this.job?.id;
      console.log('Saving job data:', jobData);

      if (this.job && this.job.id) {
        this.jobService.updateJobStatus(jobData).subscribe({
          next: (updatedJob) => {
            this.activeModal.close(updatedJob);
          },
          error: (error) => {
            this.errorMessage = 'Failed to update job. Please try again.';
            console.error('Error updating job:', error);
          }
        });
      } else {
        this.jobService.saveJob(jobData).subscribe({
          next: (savedJob) => {
            this.activeModal.close(savedJob);
          },
          error: (error) => {
            this.errorMessage = 'Failed to save job. Please try again.';
            console.error('Error saving job:', error);
          }
        });
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  clearError() {
    this.errorMessage = null;
  }
}
