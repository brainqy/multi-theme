import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { JwtService } from './Core/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'multi-theme';
  constructor(private theme: ThemeService, private jwt:JwtService){
    
  }

}
