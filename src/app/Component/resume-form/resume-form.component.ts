import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from 'src/app/Core/services/resume.service';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {
  resumeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.resumeForm = this.fb.group({
      applicantName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],
      dateOfBirth: [''],
      experiences: this.fb.array([]),
      qualifications: this.fb.array([]),
      certifications: [''],
      achievements: [''],
      linkedInUrl: [''],
      githubUrl: [''],
      portfolioUrl: [''],
      referenceName: [''],
      referenceEmail: [''],
      referencePhone: [''],
    });
  }

  ngOnInit(): void {
    this.addExperience(); // Start with one experience form
    this.addQualification(); // Start with one qualification form
  }

  get experiences(): FormArray {
    return this.resumeForm.get('experiences') as FormArray;
  }

  get qualifications(): FormArray {
    return this.resumeForm.get('qualifications') as FormArray;
  }

  addExperience(): void {
    const experienceForm = this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.experiences.push(experienceForm);
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addQualification(): void {
    const qualificationForm = this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
    });
    this.qualifications.push(qualificationForm);
  }

  removeQualification(index: number): void {
    this.qualifications.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    const resumeData = {
      applicantName: this.resumeForm.get('applicantName')?.value,
      email: this.resumeForm.get('email')?.value,
      phone: this.resumeForm.get('phone')?.value,
      address: this.resumeForm.get('address')?.value,
      city: this.resumeForm.get('city')?.value,
      state: this.resumeForm.get('state')?.value,
      country: this.resumeForm.get('country')?.value,
      postalCode: this.resumeForm.get('postalCode')?.value,
      dateOfBirth: this.resumeForm.get('dateOfBirth')?.value,
  
      experiences: this.resumeForm.get('experiences')?.value?.map((exp: any) => ({
        jobTitle: exp.jobTitle,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate
      })) || [],
  
      qualifications: this.resumeForm.get('qualifications')?.value?.map((qual: any) => ({
        degree: qual.degree,
        institution: qual.institution
      })) || [],
  
      // Ensure these fields are arrays
      certifications: this.resumeForm.get('certifications')?.value || [],
      achievements: this.resumeForm.get('achievements')?.value || [],
  
      linkedInUrl: this.resumeForm.get('linkedInUrl')?.value,
      githubUrl: this.resumeForm.get('githubUrl')?.value,
      portfolioUrl: this.resumeForm.get('portfolioUrl')?.value,
      referenceName: this.resumeForm.get('referenceName')?.value,
      referenceEmail: this.resumeForm.get('referenceEmail')?.value,
      referencePhone: this.resumeForm.get('referencePhone')?.value
    };
  
    this.resumeService.createResume(resumeData).subscribe(response => {
      console.log('Resume submitted successfully!', response);
    }, error => {
      console.error('Error submitting resume:', error);
    });
  }
  
  
  
}
