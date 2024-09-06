import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  constructor(private theme: ThemeService) { }

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
