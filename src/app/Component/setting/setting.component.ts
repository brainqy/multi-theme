import { Component } from '@angular/core';
import { SecretService } from 'src/app/Core/services/secret.service';
import { ThemeService } from 'src/app/Core/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  sideNavStatus: boolean = true;
  selectedTheme!: string;
 // themes: string[];
 secret: string = ''; // Variable to store the secret
 themes: string[] = ['light', 'dark'];

  constructor(private themeService: ThemeService,private theme: ThemeService,
    private secretService: SecretService) {
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
saveSecret(): void {
  if (this.secret) {
    this.secretService.saveSecret(this.secret).subscribe(
      response => {
        console.log('Secret saved successfully', response);
      },
      error => {
        console.error('Error saving secret', error);
      }
    );
  } else {
    console.log('Secret is empty. Please enter a valid secret.');
  }
}
handleSecretChange(newSecret: string): void {
  this.secret = newSecret;
  console.log('Secret updated:', this.secret); // For debugging (remove in production)
}
}
