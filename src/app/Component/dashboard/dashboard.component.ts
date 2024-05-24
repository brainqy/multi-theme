import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobScanService } from 'src/app/Core/services/job-scan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideNavStatus:boolean=false;
  @Input() finalProgress: number = 0;
  @Input() progress: number = 0; // Input property for progress value
  @Input() color: string = '#4caf50'; 
  resumeText:string='';
  jobDescriptionText:string='';
  dataTransefer: any;
  latest: any;
  intervalId: NodeJS.Timeout | undefined;
  constructor(private router:Router,private reportService:JobScanService){
this.getLatest();
  }
  ngOnInit(): void {
    this.getLatest();
  }
  openScannedReport(){
this.router.navigateByUrl("/scan/latest")
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
      if(res!=null){
        this.latest=res;
        this.finalProgress=res.finalProgress;
        console.log("Latest Data ",this.latest);
      }
     
    })
  }
// Declare a flag to track whether the response has been received
responseReceived: boolean = false;

generateReport() {
  const randomString = this.generateRandomString(8);

  // Start the progress animation with a slower speed
  this.startProgress(true);

  // Send the request to generate the report
  this.reportService.generateReport(this.resumeText, this.jobDescriptionText, randomString).subscribe(
    (data: any) => {
      console.log("job scan report " + JSON.stringify(data)); // Handle the response here
      this.dataTransefer = data;
      console.log("this.dataTransefer ", this.dataTransefer);
      
      // Set progress to 100% when response is received
      this.progress = 100;

      // Set the flag to indicate that response is received
      this.responseReceived = true;
    },
    (error: any) => {
      console.error(error); // Handle error if any
      // Set progress to 100% even in case of error
      this.progress = 0;

      // Set the flag to indicate that response is received
      this.responseReceived = true;
      Swal.fire("Error",'Error Occured',"error");
    }
  );
}

startProgress(slowPhase: boolean, startProgress: number = 0) {
  const slowDuration = 60000; // 60 seconds (1 minute) for slow phase
  const fastDuration = 3000; // 3 seconds for fast phase

  const duration = slowPhase ? slowDuration : fastDuration;
  const startTime = performance.now();
  const totalSteps = 100;

  const animate = (currentTime: number) => {
    // Check if the response has been received
    if (this.responseReceived) {
      return; // Stop the animation loop if response is received
    }

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(1, elapsedTime / duration);
    this.progress = Math.floor(progress * totalSteps) + startProgress; // Adjust progress based on startProgress

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Animation completed
    }
  };

  requestAnimationFrame(animate);
}

resetScan() {
  // Reset progress to 0
  this.progress = 0;
  // Reset responseReceived flag to false
  this.responseReceived = false;
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
checkReport(){
  this.router.navigateByUrl("/scan/latest");
}


}
