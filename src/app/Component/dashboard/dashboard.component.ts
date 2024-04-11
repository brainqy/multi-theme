import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sideNavStatus:boolean=false;
  @Input() progress: number = 87; // Input property for progress value
  @Input() color: string = '#4caf50'; 
  

}
