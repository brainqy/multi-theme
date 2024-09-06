import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Core/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!:FormGroup;
  password: any;
  oldPassword:any;
  email: any;
  constructor(private formbuilder:FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService){

  }


  ngOnInit(): void {
    this.changePasswordForm = this.formbuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]],
        newPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]],
        confirmPassword: ['', [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        )]]
      },{
        validator: this.passwordMatchValidator
      }
      )
  }
   // Custom validator for password match
   private passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
 
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
 
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  changePassword(changePasswordForm:any){
    console.log("Password is sent to your registered email"+JSON.stringify(changePasswordForm.value)  );
    this.password = changePasswordForm.get('newPassword')?.value;
    this.oldPassword = changePasswordForm.get('oldPassword')?.value;
    const data = {'oldPassword': this.oldPassword, 'password': this.password};
    if (this.password != null) {
      this.apiService.changePassword(data).subscribe((res:any) => {
        console.log("res here : "+JSON.stringify(res));
          if (res.status  != 'SUCCESS') {
            Swal.fire('Failed', 'Password change failed !', 'error')

              .then(r => this.router.navigate(['']));
          } else
          Swal.fire('Success', 'Password changed successfully !', 'success')
          .then(r => this.router.navigate(['']));
        },
        error => Swal.fire('Error', 'Server not responding, please try again later ☺', 'error')
          .then(r => window.location.reload())
      );
    }

  }





}
