import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-two-steps',
  templateUrl: './auth-two-steps.component.html',
  styleUrls: ['./auth-two-steps.component.scss']
})
export class AuthTwoStepsComponent {
  code: string[] = ['', '', '', '', '', ''];

  focusNext(event: any, index: number) {
    if (event.target.value.length === 1 && index < this.code.length - 1) {
      document.getElementById(`code${index + 1}`)?.focus();
    } else if (event.target.value.length === 0 && index > 0) {
      document.getElementById(`code${index - 1}`)?.focus();
    }
  }
  
  verifyCode(){
    console.log(' verification code...');
  }
  resendCode() {
    // Logic to resend the verification code
    console.log('Resending verification code...');
  }
}
