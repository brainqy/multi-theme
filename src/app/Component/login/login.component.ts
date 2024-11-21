
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { JwtService } from 'src/app/Core/services/jwt.service';
import { LoginService } from 'src/app/Core/services/login.service';
import { User } from 'src/app/Model/User';
import { ThemeService } from 'src/app/theme.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  reg!: User[];
  emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  userLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private loginService: LoginService
  ) {
    // Initialize the form group
    this.userLoginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailpattern)]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          )
        ]
      ]
    });
  }

  ngOnInit(): void {
    // Redirect to appropriate dashboard if already authenticated
    if (this.authService.isAuthenticated()) {
      this.loginService.navigateByRoles();
    }
  }

  submit(): void {
    // Prevent submission if the form is invalid
    if (!this.userLoginForm.valid) {
      Swal.fire('Validation Error', 'Please fill in all required fields correctly.', 'error');
      return;
    }

    // Prepare user object from form values
    const user = {
      email: this.userLoginForm.value.email,
      password: this.userLoginForm.value.password
    };

    // Call login service
    this.loginService.login(user).subscribe(
      (res: any) => {
        console.log('Login response:', res);

        if (res.status === 'SUCCESS') {
          Swal.fire('Daily Streak', res.dailyStreakDto.streakNumber.toString(), 'success');
          this.handleLoginSuccess(res);
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      },
      (err: any) => {
        this.handleLoginError(err);
      }
    );
  }

  private handleLoginSuccess(res: any): void {
    this.authService.storeToken(res.token);
    this.authService.storeStreak(res.dailyStreakDto.streakNumber);
    this.authService.storeBalance(res.dailyStreakDto.userBalance);
    this.routeUserDashboard();
  }

  private handleLoginError(err: any): void {
    this.authService.removeToken();
    const errorMessage = err.error?.message || 'An unexpected error occurred.';
    Swal.fire('Error', errorMessage, 'error');
  }

  private routeUserDashboard(): void {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);

    // Navigate based on role
    switch (role) {
      case 'ROLE_TECHNICAL_MANAGER':
        this.router.navigateByUrl('/tm-dashboard');
        break;
      case 'ROLE_REQUESTER':
        this.router.navigateByUrl('/requester-home');
        break;
      default:
        Swal.fire('Error', 'Invalid role detected. Please contact support.', 'error');
        break;
    }
  }

}
