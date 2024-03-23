import { Component } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private theme: ThemeService){}

}
