import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BadgeDto, BadgeService } from 'src/app/Core/services/badge.service';
export enum BadgeRule {
  XP_BASED = 'XP_BASED',
  TASK_COMPLETION = 'TASK_COMPLETION',
  COURSE_COMPLETION = 'COURSE_COMPLETION',
  TIME_BASED = 'TIME_BASED'
}

@Component({
  selector: 'app-addbadges',
  templateUrl: './addbadges.component.html',
  styleUrls: ['./addbadges.component.scss']
})
export class AddbadgesComponent implements OnInit{
  badgeForm!: FormGroup;
  availableIcons = ['bi-fire', 'bi-star', 'bi-award', 'bi-gem']; // List of available Bootstrap icons
  activeTab = 'all';
  // Use the enum for the rules
  badgeRules = Object.values(BadgeRule); 
  badges: BadgeDto[] = [];
  newBadge: BadgeDto = {
    name: '',
    description: '',
    icon: '',  // Use an empty string for the icon by default
    backgroundColor: '#ffffff',  // Use a string for the background color
    rule: BadgeRule.XP_BASED,  // Default to XP based
    threshold: 0
  };
 // badgeRules = Object.values(BadgeRule);  // Convert enum to array for dropdown

  constructor(private fb: FormBuilder, private badgeService: BadgeService) {
    this.badgeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['bi-award'], // Default icon
      backgroundColor: ['#ffffff'], // Default background color
      rule: ['', Validators.required],
      threshold: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllBadges();
  }

  // Fetch all badges
  getAllBadges(): void {
    this.badgeService.getAllBadges().subscribe((data: BadgeDto[]) => {
      console.log(" badges ",data);
      
      this.badges = data;
    });
  }

  // Create a new badge
  onSubmit() {
    if (this.badgeForm.valid) {
      const badgeData = this.badgeForm.value;
      this.badgeService.createBadge(badgeData).subscribe(response => {
        console.log('Badge created successfully!', response);
      }, error => {
        console.error('Error creating badge', error);
      });
    }
  }
  get backgroundColor(): string {
    return this.badgeForm.get('backgroundColor')?.value || '#ffffff';  // Default value if null
  }
  
  get iconClass(): string {
    return this.badgeForm.get('icon')?.value || 'bi-award';  // Default icon if null
  }
  
  search(activeTab: string){
    this.activeTab = activeTab;
  }

  result(activeTab: string){
    this.activeTab = activeTab;
  }
}
