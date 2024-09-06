import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentReport } from '../reports/reports.component';
import { ContentReportService } from 'src/app/Core/services/content-report.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  reportForm!: FormGroup;
  isLoggedIn!: boolean;
  username!: string;

  constructor(private fb: FormBuilder, private contentReportService: ContentReportService,
              public authService: AuthService, private jwtService: JwtService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getUserNameFromToken(token);
    }
    this.reportForm = this.fb.group({
      contentType: [''],
      tags: [[]], // Initialize as empty array
      reportedBy: [''], // Set reportedBy to username
      rating: [null, Validators.required],
      comment: ['', Validators.required],
      contentId: [null],
      link: [''] // No need to set to window.location.href
    });
  }

  onSubmit(): void {
    console.log('Form validity:', this.reportForm.valid);
    const formValues = this.reportForm.value;
    
    // Convert tags input to an array of strings
    let tagsArray: string[] = [];
    if (typeof formValues.tags === 'string') {
      tagsArray = formValues.tags.split(',').map((tag: string) => tag.trim());
    } else {
      tagsArray = formValues.tags;
    }

    const contentType = this.isForumPost() ? 'Article' : formValues.contentType; // Determine contentType

    const reporth: ContentReport = {
      contentType: contentType,
      tags: tagsArray,
      reportedBy: this.username,
      rating: +formValues.rating, // Ensure rating is a number
      comment: formValues.comment,
      contentId: 3,
      link: window.location.href // Use window.location.href if needed
    };

    // Display Swal confirmation dialog
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to submit this report?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed submission
        this.contentReportService.saveReportContent(reporth).subscribe(
          response => {
            console.log('Report saved successfully:', response);
            window.location.reload();
            Swal.fire('Success', 'Feedback saved successfully!', 'success');
          },
          error => {
            console.error('Error saving report:', error);
            Swal.fire('Failed', 'Error while saving feedback', 'error');
          }
        );
      }
    });
  }


  onRatingChange(rating: number): void {
    this.reportForm.get('rating')?.setValue(rating);
  }

  private isForumPost(): boolean {
    return window.location.href.includes('/forum/');
  }
}
