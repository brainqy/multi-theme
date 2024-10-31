import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobScanService } from 'src/app/Core/services/job-scan.service';

@Component({
  selector: 'app-resume-scan-history',
  templateUrl: './resume-scan-history.component.html',
  styleUrls: ['./resume-scan-history.component.scss']
})
export class ResumeScanHistoryComponent implements OnInit{
  @Input() progress:number=0;
  sideNavStatus:boolean=false;
  scanHistory: any;
  totalScans: any;
  maxMatch:any;
  errorMessage: string = '';
  sortedReports!: any[];
  constructor(private scanService: JobScanService,private router:Router){

  }
  ngOnInit(): void {
    this.getAllReportsByUser();
    this.getAllStarredReportsByUser();
    this.sortReportsByFinalProgress();
  }
  getAllReportsByUser() {
    this.scanService.getAllReportsByUser().subscribe(
      (res) => {
        if (res && Array.isArray(res)) {
          console.log("All scan history", res);
          this.totalScans = res.length;
          console.log("Total scans", this.totalScans);
  
          // Show only the last 5 items
          this.scanHistory = res.slice(-5);
          console.log("Filtered scan history", this.scanHistory);
  
          this.maxMatch = Math.floor(this.calculateMaxFinalProgress(res));
        } else {
          console.warn("Unexpected response format:", res);
          this.totalScans = 0;
          this.scanHistory = [];
          this.maxMatch = 0;
        }
      },
      (error) => {
        console.error("Error fetching scan history", error);
        // Handle error scenario
        this.totalScans = 0;
        this.scanHistory = [];
        this.maxMatch = 0;
      }
    );
  }
  
  getAllStarredReportsByUser() {
    this.scanService.getAllReportsByUser().subscribe(
      (res) => {
        // Check if the response is valid and an array
        if (res && Array.isArray(res)) {
          // Filter the results to get only starred items
          const starredReports = res.filter(item => item.starred === true);

          // Log the filtered starred reports
          console.log("All starred reports:", starredReports);
          this.totalScans = starredReports.length; // Total starred scans

          if (this.totalScans > 0) {
            console.log("Total starred scans:", this.totalScans);
  
            // Show only the last 5 starred items
            this.scanHistory = starredReports.slice(-5);
            console.log("Filtered scan history:", this.scanHistory);
  
            this.maxMatch = Math.floor(this.calculateMaxFinalProgress(starredReports));
            console.log("highest match ",this.maxMatch);
            
          } else {
            console.warn("No starred scans found.");
            this.scanHistory = [];
            this.maxMatch = 0;
          }
        } else {
          console.warn("Unexpected response format:", res);
          this.totalScans = 0;
          this.scanHistory = [];
          this.maxMatch = 0;
        }
      },
      (error) => {
        console.error("Error fetching scan history", error);
        // Handle error scenario
        this.totalScans = 0;
        this.scanHistory = [];
        this.maxMatch = 0;
      }
    );
}


sortReportsByFinalProgress() {
  this.scanService.getAllReportsByUser().subscribe(sections => {
    // Ensure sections are defined and not empty before processing
    if (sections && Array.isArray(sections)) {
      this.sortedReports = this.calculateAndSortReports(sections);
      console.log("Sorted Reports by Final Progress:", this.sortedReports);
    } else {
      console.warn("No sections available to sort.");
      this.sortedReports = []; // Handle empty sections
    }
  }, error => {
    console.error("Error fetching reports:", error);
    this.sortedReports = []; // Handle error scenario
  });
}

 calculateAndSortReports(sections: any[]): any[] {
  return sections
    .map(section => {
      const finalProgress = this.calculateFinalProgress(section);
      return { ...section, finalProgress }; // Create a new object with finalProgress included
    })
    .sort((a, b) => b.finalProgress - a.finalProgress); // Sort in decreasing order
}




 calculateFinalProgress(section: any): number {
  const { percentage, issues } = section;
  const penaltyFactor = issues > 0 ? 0.5 : 1; // Adjust the penalty as needed
  const finalProgress = percentage * penaltyFactor;
  return finalProgress;
}

  
getPlans(){
  this.router.navigateByUrl("/plans");
}
calculateMaxFinalProgress(data:any): number {
  return Math.max(...data.map((job: { finalProgress: any; }) => job.finalProgress));
}
toggleStar(item: any) {
  this.scanService.saveAsStarred(item.wrapper_id).subscribe(
    (res) => {
      item.starred = !item.starred;
    },
    (error) => {
      this.errorMessage = error;
    }
  );
}
}
