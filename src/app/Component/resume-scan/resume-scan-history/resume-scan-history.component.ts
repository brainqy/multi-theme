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
  constructor(private scanService: JobScanService,private router:Router){

  }
  ngOnInit(): void {
    this.getAllReportsByUser();
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
