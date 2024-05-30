import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  jobTitle: string = 'Job Title';
  companyName: string = 'Company Name';
  jobForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.jobForm = this.formBuilder.group({
      jobTitle: ['Job Title', Validators.required],
      jobDescription: ['', Validators.required],
      companyName: ['Company Name', Validators.required],
      jobListingUrl: [''],
      salary: [''],
      dateSpecified: ['']
    });
  }

  save() {
    if (this.jobForm.valid) {
      console.log(" values ",this.jobForm.value);
      
      this.activeModal.close(this.jobForm.value);
    } else {
      // Handle form validation errors
    }
  }
}
