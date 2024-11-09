import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Core/services/auth.service';
import { BadgeDto, BadgeService } from 'src/app/Core/services/badge.service';
import { JwtService } from 'src/app/Core/services/jwt.service';

interface ProfileField {
  field: string;
  weight: number;
  completed: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  //profileCompletion: number = 85; 
  activeTab: string = 'profile'; 
  profilePictureUrl: string = 'assets/img/profile.png'; // Default profile picture

  sideNavStatus: boolean = true;
  username: string = '';
  isLoggedIn = false;
  buttons: { toggled: boolean }[] = Array(8).fill({ toggled: false }).map(() => ({ toggled: false }));
  dailyStrike: number = 5;
  @Input() streakNumber: number = 0;  // Input from parent component

  fireIcons: any[] = [];
  userBalance: any;
  badges: BadgeDto[] = [];

  profileFields: ProfileField[] = [
    { field: "profilePicture", weight: 10, completed: false },
    { field: "username", weight: 15, completed: true },
    { field: "email", weight: 15, completed: true },
    { field: "bio", weight: 10, completed: false },
    { field: "location", weight: 10, completed: false },
    { field: "skills", weight: 20, completed: true },
    { field: "experience", weight: 20, completed: true }
  ];
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
setActiveTab(tab: string): void {
  this.activeTab = tab;
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input?.files?.[0]) {
    const file = input.files[0];
    this.profilePictureUrl = URL.createObjectURL(file); // Set the profile picture to the selected file
    this.updateProfileField('profilePicture', true); // Set profilePicture as completed

  }
}
  loadBadges(): void {
    this.badgeService.getAllBadges().subscribe(
      (badges: BadgeDto[]) => this.badges = badges,
      error => console.error('Error loading badges', error)
    );
  }
  get profileCompletion(): number {
    const totalWeight = this.profileFields.reduce((sum, field) => sum + field.weight, 0);
    const completedWeight = this.profileFields
      .filter(field => field.completed)
      .reduce((sum, field) => sum + field.weight, 0);

    return Math.round((completedWeight / totalWeight) * 100);
  }
  updateProfileField(field: string, status: boolean): void {
    const profileField = this.profileFields.find(f => f.field === field);
    if (profileField) {
      profileField.completed = status;
    }
  }
}
