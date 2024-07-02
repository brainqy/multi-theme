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
  constructor(private scanService: JobScanService,private router:Router){

  }
  ngOnInit(): void {
    this.getAllReportsByUser();
  }
getAllReportsByUser(){
  this.scanService.getAllReportsByUser().subscribe((res)=>{
    console.log("all scan History",res);
    this.totalScans=res.length;
    console.log("this.totalScans",this.totalScans);
    
    this.scanHistory=res;
    console.log("This alll history",this.scanHistory);
    this.maxMatch=Math.floor(this.calculateMaxFinalProgress(res));
    
    
    
  })
}
getPlans(){
  this.router.navigateByUrl("/plans");
}
calculateMaxFinalProgress(data:any): number {
  return Math.max(...data.map((job: { finalProgress: any; }) => job.finalProgress));
}
}
