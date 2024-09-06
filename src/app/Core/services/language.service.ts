import { Injectable } from '@angular/core';
import { loadTranslations, } from '@angular/localize';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private selectedLanguageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  public selectedLanguage$: Observable<string> = this.selectedLanguageSubject.asObservable();

  constructor(private translate: TranslateService) {}

  setLanguage(language: string): void {
    this.translate.use(language);
    this.selectedLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language);
  }

  getSelectedLanguage(): string {
    return localStorage.getItem('selectedLanguage') || 'en';
  }
  setDefaultLanguage() {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      this.translate.setDefaultLang(selectedLanguage);
    } else {
      this.translate.setDefaultLang('en'); // Default to English if not set
    }
  }
}
