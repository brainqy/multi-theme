import { Component } from '@angular/core';
import { ThemeService } from 'src/app/Core/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  sideNavStatus: boolean = false;
  selectedTheme!: string;
 // themes: string[];
 themes: string[] = ['light', 'dark'];

  constructor(private themeService: ThemeService,private theme: ThemeService) {
    const selectedTheme = localStorage.getItem('selectedTheme');
    this.themes = this.themes;
    console.log("this.themes",this.themes);
  }

ngOnInit(): void {
}

public switchTheme(): void {
  if (this.theme.current === 'light') {
      this.theme.current = 'dark';
  } else {
      this.theme.current = 'light';
  }
}
}
