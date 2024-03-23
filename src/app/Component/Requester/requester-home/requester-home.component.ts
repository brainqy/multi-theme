import {Component} from '@angular/core';
import {AuthService} from "../../../Core/services/auth.service";
import {JwtService} from "../../../Core/services/jwt.service";
import {Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-requester-home',
  templateUrl: './requester-home.component.html',
  styleUrls: ['./requester-home.component.css']
})
export class RequesterHomeComponent {

  sideNavStatus: boolean = false;
  username: string = '';
  isLoggedIn = false;

  constructor(public authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
              private translate: TranslateService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getFullNameFromToken(token);
    }
  }
}
