import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { BadgeDto, BadgeService } from 'src/app/Core/services/badge.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  sideNavStatus: boolean = true;
  username: string = '';
  isLoggedIn = false;
  buttons: { toggled: boolean }[] = Array(8).fill({ toggled: false }).map(() => ({ toggled: false }));
  dailyStrike: number = 5;
  @Input() streakNumber: number = 0;  // Input from parent component

  fireIcons: any[] = [];
  userBalance: any;
  badges: BadgeDto[] = [];
  constructor(public authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
              private translate: TranslateService,
              private badgeService: BadgeService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getFullNameFromToken(token);
      this.streakNumber=this.authService.getStreak();
      this.userBalance=this.authService.getBalance();
    };
  
    this.getMyBadge();
}


getMyBadge(){
  this.badgeService.getMyBadges().subscribe(
    (badges: BadgeDto[]) => this.badges = badges,
      error => console.error('Error loading badges', error)
  );
}


  loadBadges(): void {
    this.badgeService.getAllBadges().subscribe(
      (badges: BadgeDto[]) => this.badges = badges,
      error => console.error('Error loading badges', error)
    );
  }
}
