import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent {
  constructor() {}

  toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    } else {
      navbarCollapse?.classList.add('show');
    }
  }

}
