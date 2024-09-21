import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-requester-sidebar',
  templateUrl: './requester-sidebar.component.html',
  styleUrls: ['./requester-sidebar.component.css']
})
export class RequesterSidebarComponent {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: 1,
      name: 'Home',
      icon: 'fas fa-home',
      link: '/requester-home'
    },
   {
      number: 2,
      name: 'Dashboard',
      icon: 'fas fa-chart-line',
      link: 'dashboard'
    }, 
     /* {
      number: 3,
      name: 'Schedule meeting',
      icon: 'fas fa-calendar-alt',
      link: 'book-calendar'
    },
    {
      number: 4,
      name: 'Reports',
      icon: 'fas fa-file-alt',
      link: '/reports'
    }, */
    {
      number: 4,
      name: 'Wallet',
      icon: 'fas fa-file-alt',
      link: '/transactions'
    }, 
    {
      number: 5,
      name: 'Forum',
      icon: 'fas fa-comments',
      link: '/forum-list'
    },
    {
      number: 6,
      name: 'Booked Interviews',
      icon: 'fas fa-calendar-alt', // Changed icon to calendar
      link: '/booked-interviews'
    },
    {
      number: 6,
      name: 'Job Tracker',
      icon: 'fas fa-briefcase', // Changed icon to briefcase
      link: '/job-tracker'
    },
    {
      number: 4,
      name: 'Resume Scan',
      icon: 'fas fa-file-alt',
      link: '/dashboard'
    },
/*     {
      number: 7,
      name: 'Create org',
      icon: 'fas fa-building',
      link: '/my-org'
    }, */
    {
      number: 8,
      name: 'Share',
      icon: 'fas fa-share-alt',
      link: 'referrals'
    }
  ];
  
}
