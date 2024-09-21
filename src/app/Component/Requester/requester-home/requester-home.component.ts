import {Component, Input} from '@angular/core';
import {AuthService} from "../../../Core/services/auth.service";
import {JwtService} from "../../../Core/services/jwt.service";
import {Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-requester-home',
  templateUrl: './requester-home.component.html',
  styleUrls: ['./requester-home.component.css']
})
export class RequesterHomeComponent {

  sideNavStatus: boolean = false;
  username: string = '';
  isLoggedIn = false;
  buttons: { toggled: boolean }[] = Array(8).fill({ toggled: false }).map(() => ({ toggled: false }));
  dailyStrike: number = 5;
  @Input() streakNumber: number = 0;  // Input from parent component

  fireIcons: any[] = [];
  userBalance: any;
  constructor(public authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getFullNameFromToken(token);
      this.streakNumber=this.authService.getStreak();
      this.userBalance=this.authService.getBalance();
    }
    const maxIcons = 8; // Maximum number of icons to show

    // Push icons based on streakNumber
    for (let i = 0; i < maxIcons; i++) {
      this.fireIcons.push({});
    }
  }
 
}
