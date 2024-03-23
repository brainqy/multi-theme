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
      name: 'home',
      icon: 'fa-solid fa-house',
      link:''
    },
    {
      number: 2,
      name: 'Analytics',
      icon: 'fa-solid fa-chart-line',
      link:''
    },
    {
      number: 3,
      name: 'Schedule meeting',
      icon: 'fa-solid fa-box',
      link:'book-calendar'
    },
    {
      number: 6,
      name: 'Reports',
      icon: 'fa-solid fa-circle-info',
      link:'/reports'
    },
    {
      number: 7,
      name: 'Create org',
      icon: 'fa-solid fa-phone',
      link:'/my-org'
    },
    {
      number: 7,
      name: 'Share',
      icon: 'fa-solid fa-share-alt',
      link:'referrals'
    },
  ]
}
