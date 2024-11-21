import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

downloadReport() {
  const element = document.body; // Replace with a specific div if needed
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgHeight = (canvas.height * 210) / canvas.width; // Maintain aspect ratio
    pdf.addImage(imgData, 'PNG', 0, 0, 210, imgHeight);
    pdf.save('report.pdf');
  });
}
}
