import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { Job, JobService } from 'src/app/Core/services/job.service';
import Swal from 'sweetalert2';
import { InterviewService } from 'src/app/Core/services/interview.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() job: Job = {jobRole: '', company: '', jobDescription: '', jobLocation: '', jobListingUrl: '', salary: 0, dateSpecified: '', status: '' };
  company: string = 'Company name  ';
  jobForm: FormGroup;
  activeTab: string = 'jobDetails'; 
  errorMessage: string | null = null;
  interviewForm: FormGroup;
  @Input() interviews: any[] = [];
  //activeTab = 'search';

  extras = {
    coverLetterText: 'Sample cover letter text...',
    interviewNotes: 'Sample interview notes...',
    notesText: 'Sample notes text...',
  };
  slts: any[];

  search(activeTab: string){
    this.activeTab = activeTab;
  }

  ngOnInit(): void {
    if (!this.job) {
      this.job = {
        jobRole: '',
        company: '',
        jobDescription: '',
        jobLocation: '',
        jobListingUrl: '',
        salary: 0,
        dateSpecified: '',
        status: ''
      };
    }
    
    
    
  }
  time = { hour: 13, minute: 30 };
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,private interviewService:InterviewService,
    private jobService: JobService,private fb: FormBuilder
  ) {
    this.jobForm = this.formBuilder.group({
      jobRole: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobLocation: [''],
      company: ['', Validators.required],
      jobListingUrl: [''],
      salary: 0,
      dateSpecified: [''],
      status: ['']
    });
    this.interviewForm = this.fb.group({
      interviewType: ['', Validators.required],
      day: ['', Validators.required],
      hrName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      hrEmail: ['', [Validators.required, Validators.email]],
      meetingLink: [''],
      description: [''],
      slot:[],
      jobId:0,
      status:['SCHEDULED']
    });
    this.slts=this.interviews
    console.log("slts",this.slts);
    
  }
  isEmptyJob(): boolean {
    return !this.job.jobRole && !this.job.company && !this.job.jobDescription && !this.job.jobLocation && !this.job.jobListingUrl && this.job.salary === 0 && !this.job.dateSpecified && !this.job.status;
  }


  save(form: NgForm) {
    if (form.valid) {
      const jobData = { ...form.value };
      
      if (this.job && this.job.id) {
        jobData.id = this.job.id;
        console.log('Updating job data:', jobData);
        
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
        console.log('Creating new job data:', jobData);
        
        this.jobService.saveJob(jobData).subscribe({
          next: (savedJob) => {
            this.activeModal.close(savedJob);
            Swal.fire("SUCCESS","Job saved successfully",'success');
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

  saveInterview(jobId:any){
    if (this.interviewForm.valid) {
      console.log(this.interviewForm.value);
      this.interviewForm.value.jobId=jobId;
      this.interviewService.saveinterviewSlot(this.interviewForm.value).subscribe((res)=>{
        console.log("after saving interview slot ",res);
      })
    } else {
      console.log('Form is invalid');
    }
  }

/*   clearError() {
    this.errorMessage = null;
  }; */
  
}
