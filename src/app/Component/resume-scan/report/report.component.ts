import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap, throwError, timer } from 'rxjs';
import { JobScanService } from 'src/app/Core/services/job-scan.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent  implements OnInit{
  @Input() progress: number = 87; // Input property for progress value
  @Input() color: string = '#4caf50'; 
  allData:any;
data:any;
title:any;
  finalProgress: any;
  loading:any;
constructor( private reportService:JobScanService,private route: ActivatedRoute){
  this.getLatest();
 
}
ngOnInit() {

}
setNumber: boolean = true;
clicked: boolean = false;
number: number = 1; // Or any default number you want to display
  getLatest(){
    this.reportService.getLatestReport().subscribe((res)=>{
      if(res!=null){
        this.allData=res.allData;
        this.finalProgress=res.finalProgress;
        console.log("Latest Data ",this.allData);
      }
     
    })
  }
toggleClicked(): void {
  this.clicked = !this.clicked;
  console.log("click",this.clicked);
}
tada=[
  {id:1,value:"Add resume and job description",isVerify:true},
  {id:2,value:"Add suggestions below to your resume",isVerify:true},
  {id:3,value:"Upload resume & rescan",isVerify:false}
]

toggleVerify(item: any) {
  item.isVerify = !item.isVerify;
}

printwindows(){
  window.print();
}
}
