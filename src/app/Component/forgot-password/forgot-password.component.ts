import {Component, OnInit} from '@angular/core';
import * as Constants from '../../Core/application_constant/constant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Messages} from '../../Core/application_constant/message_constants';
import {ApiService} from 'src/app/Core/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  MESSAGE_CONSTANTS: any = Messages;
  submitted: boolean = false;
  resetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]]
  });

  constructor(private apiservice: ApiService, private fb: FormBuilder, public toastr: ToastrService) {

  }

  //THIS METHOD IS RESPONSIBLE TO RETURN ALL THE CONTROLS OF FORM
  get f() {
    return this.resetPasswordForm.controls;
  }

  ngOnInit(): void {

  }

  // SUBMIT RESET PASSWORD FORM
  submitResetPasswordForm() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      /* this.resetPasswordForm.reset();
      this.showSuccess('We have send password reset link successfully.');
      this.submitted = false; */


      let formdata = new FormData();
      formdata.set("email", this.f['email'].value);
      this.apiservice.forgotPassword(formdata, "/ytms/users/forgotPassword").subscribe({
        next: (data: any) => {
          if (data.status != 'SUCCESS') {
            this.showMessage(data.message, 'Error');

          } else {

            this.showMessage(data.message, 'Success');

            console.log(data);

          }
          this.resetPasswordForm.reset();
          this.submitted = false;

        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }


  //SUCCESS MESSAGE IF EMAIL SEND SUCCESSFULLY
  showMessage(message: string, messageType: string) {
    if (messageType === 'Success') {
      this.toastr.success(message, messageType, {
        timeOut: 5000,
      });
    } else {
      this.toastr.error(message, messageType, {
        timeOut: 5000,
      });
    }

  }
}
