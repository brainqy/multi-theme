import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../Core/services/auth.service";
import {Router} from "@angular/router";
import {JwtService} from "../../../Core/services/jwt.service";
import { LanguageService } from 'src/app/Core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-requester-header',
  templateUrl: './requester-header.component.html',
  styleUrls: ['./requester-header.component.css']
})
export class RequesterHeaderComponent {

  isLoggedIn = false;
  username: string = '';
  selectedLanguage!:any;
  selectedTheme!: string;

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus!: boolean ;

  constructor(public authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
              private languageService: LanguageService,
              private translate: TranslateService,private theme: ThemeService) {

  }

  switchTheme(): void {
    this.theme.current = this.selectedTheme;
    console.log("this.theme.current", this.theme.current);
  }

  ngOnInit(): void {
    this.selectedTheme = this.theme.current;
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const token = this.authService.getToken();
      this.username = this.jwtService.getFullNameFromToken(token);
    }
  this.selectedLanguage = localStorage.getItem('selectedLanguage');
    this.languageService.setDefaultLanguage();
  }

  sideNavToggle() {
    console.log("side nav is working");
    const storedMenuStatus = localStorage.getItem('menuStatus');
    if (storedMenuStatus) {
      this.menuStatus = JSON.parse(storedMenuStatus); // Parse stored string back to boolean
    }
    this.menuStatus = !this.menuStatus;
    localStorage.setItem('menuStatus', JSON.stringify(this.menuStatus)); // Save menu status in local storage
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout() {
    this.authService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

  switchLanguage(): void {
    this.languageService.setLanguage(this.selectedLanguage);
  }
}
