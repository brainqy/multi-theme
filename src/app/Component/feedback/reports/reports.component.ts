import { Component } from '@angular/core';
import { ContentReportService } from 'src/app/Core/services/content-report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  sideNavStatus: boolean = false;
  contents: ContentReport[] = [];
  contentReportsByLink: any[] = [];
  groupReports: any[] = [];
  avgRating: number = 0;
  ressortedBy: any[] = [];

  constructor(private contentReportService: ContentReportService) { }

  ngOnInit() {
    this.getAllReports();
  }

  getAllReports() {
    this.contentReportService.getAllContentReports().subscribe(
      reports => {
        this.contents = reports;
        this.contents.sort((a, b) => a.rating - b.rating);
        console.log('All reports:', reports);
      },
      error => {
        console.error('Error fetching reports:', error);
      }
    );
    
  }

  getContentReportByLink(link: string): void {
    this.contentReportService.getContentReportByLink(link).subscribe(
      response => {
        this.avgRating = response.averageRating;
        this.contentReportsByLink = response.reports;
        console.log('Content reports by link:', response);
      },
      error => {
        console.error('Error fetching content reports:', error);
      }
    );
  }
  getRatingColor(averageRating: number): string {
    if (averageRating < 3) {
      return 'red'; // or any other color representation
    } else if (averageRating >= 3 && averageRating < 4) {
      return 'orange'; // or any other color representation
    } else {
      return 'green'; // or any other color representation
    }
  }
  
  sortByContent() {
    this.contentReportService.getContentReportByGroupLink().subscribe(
      data => {
        this.groupReports = data;
        this.groupReports.sort((a, b) => a.averageRating - b.averageRating);
        console.log("Grouped data by link:", this.groupReports);
      },
      error => {
        console.error('Error fetching grouped data:', error);
      }
    );
  }

  sortReportedBy() {
    this.contentReportService.getContentReportReportedBy().subscribe(
      data => {
        this.ressortedBy = data;
        this.ressortedBy.sort((a, b) => a.averageRating - b.averageRating);
        console.log("Grouped data by reportedBy:", this.ressortedBy);
      },
      error => {
        console.error('Error fetching grouped data:', error);
      }
    );
  }
}


export interface ContentReport {
  contentType: string;
  tags: string[];
  reportedBy: string;
  rating: number;
  comment: string;
  contentId: number;
  link: string;
}
