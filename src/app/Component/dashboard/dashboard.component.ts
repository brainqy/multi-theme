import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobScanService } from 'src/app/Core/services/job-scan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sideNavStatus:boolean=false;
  @Input() progress: number = 87; // Input property for progress value
  @Input() color: string = '#4caf50'; 
  resumeText:string='';
  jobDescriptionText:string='';
  dataTransefer: any;
  latest: any;
  constructor(private router:Router,private reportService:JobScanService){
this.getLatest();
  }
  openScannedReport(){
this.router.navigateByUrl("/scan/acdvb")
  }

  generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let code = '';
    const usedCodes = new Set<string>();
  
    while (usedCodes.size < length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const char = characters.charAt(randomIndex);
      if (!usedCodes.has(char)) {
        code += char;
        usedCodes.add(char);
      }
    }
  
    return code;
  }
  getLatest(){
    this.reportService.getLatestReport().subscribe((res)=>{
      this.latest=res;
      console.log("Latest Data ",this.latest);
    })
  }
  generateReport() {
    const randomString = this.generateRandomString(8);
    this.reportService.generateReport(this.resumeText, this.jobDescriptionText,randomString).subscribe(
      (data: any) => {
        console.log("job scan report "+JSON.stringify(data)); // Handle the response here
        this.dataTransefer=data;
        console.log("this.dataTransefer ",this.dataTransefer)
      },
      (error: any) => {
        console.error(error); // Handle error if any
      }
    );
    const dataStrngified=JSON.stringify(this.dataTransefer);
    console.log("dataStrngified",dataStrngified);
    this.router.navigate(['/scan/abcghj', { data:"dataStrngified"}]);
  
  }
generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
}
