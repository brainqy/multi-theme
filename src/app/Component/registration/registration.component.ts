import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from "../../Core/services/login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  hideReferralField: boolean = false;
  signUpForm: FormGroup = this.formBuilder.group(
    {
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      emailAdd: ['', [Validators.required, Validators.pattern(/^[^\s@]+@gmail\.com$/)]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
      confirmPassword: ['', [Validators.required]],
      ref:['']
    })

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params?.['ref']) { // Using the safe navigation operator (?.)
        this.hideReferralField = true;
        // If ref parameter is present, set it to the form control
        this.signUpForm.get('ref')?.setValue(params['ref']); // Using the safe navigation operator (?.)
      }
    });

  }

  submit(): void {
    if (this.signUpForm.valid) {
      let user = {
        fullName: this.signUpForm.value.fullName,
        emailAdd: this.signUpForm.value.emailAdd,
        password: this.signUpForm.value.password,
        confirmPassword: this.signUpForm.value.confirmPassword,
        ref: this.signUpForm.value.ref.trim() !== '' ? this.signUpForm.value.ref : null
      }
      console.log("user ...",user);

      this.loginService.register(user).subscribe(res => {
        if (res != null) {
          Swal.fire('Success', 'Request Successfully submitted to Admin for Approval', 'success');
          this.router.navigate(['']);
        } else
          Swal.fire('Error', 'Registration failed', 'error');
      })
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  validateSubmit() {
    if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

}
