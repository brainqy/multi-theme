import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/Core/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  email!: any;
  password?: any = "";

  constructor(private formbuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('session');
    this.password = "";
    //const secondParam: string = this.route.snapshot.queryParamMap.get('secondParamKey');
    this.resetPasswordForm = this.formbuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]],
        confirmPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]]
      }
      , {
        validator: this.passwordMatchValidator
      })
  }

  resetPassword(resetPasswordForm: any) {

    this.password = resetPasswordForm.get('newPassword')?.value;
    const data = {'email': this.email, 'password': this.password};
    if (this.password != null) {
      this.apiService.resetPassword(data).subscribe(res => {
          if (res == true) {
            Swal.fire('Success', 'Password changed successfully !', 'success')
              .then(r => this.router.navigate(['']));
          } else
            Swal.fire('Failed', 'Password change failed !', 'error')
              .then(r => window.location.reload());
        },
        error => Swal.fire('Error', 'Server not responding, please try again later ☺', 'error')
          .then(r => window.location.reload())
      );
    }


  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;


    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({passwordMismatch: true});
    } else {
      //this.password=formGroup.get('newPassword')?.value;
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    return newPassword === confirmPassword ? null : {passwordMismatch: true};
  }


}
