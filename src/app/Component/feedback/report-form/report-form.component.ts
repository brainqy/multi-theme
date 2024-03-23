import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentReport } from '../reports/reports.component';
import { ContentReportService } from 'src/app/Core/services/content-report.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit{
  reportForm!: any;
  isLoggedIn!: boolean;
  username!: any;

  constructor(private fb: FormBuilder,private contentReportService: ContentReportService,
    public authService: AuthService,
    private jwtService: JwtService,
    private router: Router) { }



  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
if (this.isLoggedIn) {
const token = this.authService.getToken();
this.username = this.jwtService.getFullNameFromToken(token);
}
    this.reportForm = this.fb.group({
      contentType: ['', Validators.required],
      tags: [[]],
      reportedBy: ['', Validators.required],
      rating: [null],
      comment: [''],
      contentId: [null],
      link:['']
    });
  }

 
  onSubmit() {
   
    const url = window.location.href;
    const formValues = this.reportForm.value;
    const tagsArray = formValues.tags.split(',').map((tag: string) => tag.trim());
    let contentType = formValues.contentType;
    if (url.includes("/forum/")) {
      contentType = "Article";
    }

    const reporth: ContentReport = {
      contentType: contentType,
      tags: tagsArray,
      reportedBy: this.username,
      rating: formValues.rating,
      comment: formValues.comment,
      contentId: 3,
      link: window.location.href
    };
    console.log('URL:', url);
    console.log('Form Values:', formValues);
    this.contentReportService.saveReportContent(reporth).subscribe(
      response => {
        console.log('Report saved successfully:', response);
      },
      error => {
        console.error('Error saving report:', error);
      }
    );
  }
  onRatingChange(rating: number): void {
    this.reportForm.get('rating')?.setValue(rating);
  }

}
