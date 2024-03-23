import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/Core/services/language.service';
import { ReferralsService } from 'src/app/Core/services/referrals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent {
  myReferralLink!:string;
  sideNavStatus: boolean = false;

  referredPeople: { referralCode: any; email: any; status: any; referredAt: Date | null; }[] | undefined;
  selectedLanguage!: string | null;
  ngOnInit(){
    this.getReferrals();
    this.myReferralLink=this.getMyReferralLink();
    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    this.languageService.setDefaultLanguage();
  }
  constructor(private referralService:ReferralsService,
               private datePipe: DatePipe,
               private translate: TranslateService,
               private languageService: LanguageService){

  }
  getReferrals() {
    this.referralService.getReferrals().subscribe((res: any[]) => {
      this.referredPeople = res.map(referral => {
        // Convert referredAt from string to Date, handling null case
        const referredAt = referral.referredAt ? new Date(referral.referredAt[0], referral.referredAt[1] - 1, referral.referredAt[2], referral.referredAt[3]) : null;
        return {
          referralCode: referral.referralCode,
          email: referral.email,
          status: referral.status,
          referredAt: referredAt
        };
      });
      console.log("Received referrals are", this.referredPeople);
    });
  }
  getWallet(){
    this.referralService.getWallet().subscribe((res)=>{
console.log("res",res);
    })
  }
  getMyReferralLink(){
    const myLink=this.referralService.getMyReferralLink().subscribe((res)=>{
     
      this.myReferralLink=res;
      console.log("My referral link",this.myReferralLink);
    })
    return this.myReferralLink;
    
  }
  resendEmail(referral: any) {
    // Assuming you have a function in the referral service to resend email
    this.referralService.sendEmail(referral.email).subscribe((res) => {
      console.log('Resend email response:', res);
      console.log('Resend email response:', res.body.message);
      Swal.fire("Info",res.body.message,'info');
      
      // Optionally, you can update the status of the referral after successful resend
      referral.status = 'email resent';
    });
  }
  copyToClipboard(): void {
    // Create a temporary input element
    const inputElement = document.createElement('input');
    inputElement.setAttribute('value', this.myReferralLink);
    document.body.appendChild(inputElement);
    
    // Select the input element and copy its value to the clipboard
    inputElement.select();
    document.execCommand('copy');

    // Remove the input element from the DOM
    document.body.removeChild(inputElement);

    // Optionally, provide user feedback (e.g., toast message)
    Swal.fire("Info","Referral link copied to clipboard!",'info');
    //alert('Referral link copied to clipboard!');
  }
}
export interface Referral {
  referralCode: string;
  email: string;
  status: string;
  referredAt: Date;
}

