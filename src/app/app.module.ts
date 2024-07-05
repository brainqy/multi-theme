

import { NgModule, LOCALE_ID } from '@angular/core';
import {RequesterHeaderComponent} from './Component/Requester/requester-header/requester-header.component';
import {RequesterSidebarComponent} from './Component/Requester/requester-sidebar/requester-sidebar.component';
import {ForgotPasswordComponent} from './Component/forgot-password/forgot-password.component';
import {authInterceptorProviders} from "./Core/interceptor/auth.interceptor";
import {TmHomeComponent} from './Component/Technical-Manager/tm-home/tm-home.component';
import {TmHeaderComponent} from './Component/Technical-Manager/tm-header/tm-header.component';
import {TmSidebarComponent} from './Component/Technical-Manager/tm-sidebar/tm-sidebar.component';
import {RegistrationComponent} from "./Component/registration/registration.component";
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { CalenderComponent } from './Component/calender/calender.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MnHomeComponent } from './Component/Manager/mn-home/mn-home.component';
import { MnSidebarComponent } from './Component/Manager/mn-sidebar/mn-sidebar.component';
import { MnHeaderComponent } from './Component/Manager/mn-header/mn-header.component';
import { MyOrgComponent } from './Component/my-org/my-org.component';
import { ReferralsComponent } from './Component/referrals/referrals.component';
import { LanguageService } from './Core/services/language.service';
import { TransactionsComponent } from './Component/transactions/transactions.component';
import { SettingComponent } from './Component/setting/setting.component';
import { ReportsComponent } from './Component/feedback/reports/reports.component';
import { ReportFormComponent } from './Component/feedback/report-form/report-form.component';
import { InterviewMatcherComponent } from './Component/interview-matcher/interview-matcher.component';
import { ForumListComponent } from './Component/forum/forum-list/forum-list.component';
import { ForumComponent } from './Component/forum/forum/forum.component';
import { StarRatingComponent } from './Component/feedback/star-rating/star-rating.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common'; // Added import for locale data
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgCircleProgressModule } from "ng-circle-progress";
import { LoginComponent } from './Component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './Component/signup/signup.component';
import { RequesterHomeComponent } from './Component/Requester/requester-home/requester-home.component';
import { AnalyticsComponent } from './Component/analytics/analytics.component';
import { PracticeWithFrndsComponent } from './Component/practice-with-frnds/practice-with-frnds.component';
import { BookedInterviewsComponent } from './Component/booked-interviews/booked-interviews.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ReportComponent } from './Component/resume-scan/report/report.component';
import { CreateForumComponent } from './Component/forum/create-forum/create-forum.component';
import { QuillModule } from 'ngx-quill';
import { QuizPlayerComponent } from './Component/test-prep/quiz-player/quiz-player.component';
import { QuestionComponent } from './Component/test-prep/question/question.component';
import { QuizBankComponent } from './Component/test-prep/quiz-bank/quiz-bank.component';
import { ResumeScanHistoryComponent } from './Component/resume-scan/resume-scan-history/resume-scan-history.component';
import { PlansComponent } from './Component/resume-scan/plans/plans.component';
import { JobTrackerComponent } from './Component/job-tracker/job-tracker.component';
import { LandingComponent } from './Component/landing/landing.component';
import { MaintenanceComponent } from './Component/front-pages/maintenance/maintenance.component';
import { CustomSliderComponent } from './Component/custom-slider/custom-slider.component';

import { WeRLaunchingComponent } from './Component/front-pages/we-r-launching/we-r-launching.component';
import { NotAuthorizedComponent } from './Component/front-pages/not-authorized/not-authorized.component';
import { AuthTwoStepsComponent } from './Component/front-pages/auth-two-steps/auth-two-steps.component';
import { PageNotFoundComponent } from './Component/front-pages/page-not-found/page-not-found.component';
import { CommonSplitComponent } from './Component/front-pages/common-split/common-split.component';
import { ModalComponent } from './Component/job-tracker/modal/modal.component';
import { DemoComponent } from './Component/demo/demo.component';
import { DashHeaderComponent } from './Component/dash-header/dash-header.component';
import { DmComponent } from './Component/job-tracker/dm/dm.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { ContactWhatsappComponent } from './Component/contact-whatsapp/contact-whatsapp.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    QuizBankComponent,
    RequesterHeaderComponent,
    RequesterSidebarComponent,
    RequesterHomeComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    TmHomeComponent,
    TmHeaderComponent,
    TmSidebarComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    CalenderComponent,
    DateFormatPipe,
    MnHomeComponent,
    MnSidebarComponent,
    MnHeaderComponent,
    MyOrgComponent,
    ReferralsComponent,
    TransactionsComponent,
    SettingComponent,
    ReportsComponent,
    ReportFormComponent,
    InterviewMatcherComponent,
    ForumComponent,
    ForumListComponent,
    StarRatingComponent,
    ThemeSwitcherComponent,
    LoginComponent,
    SignupComponent,
    RequesterHomeComponent,
    AnalyticsComponent,
    PracticeWithFrndsComponent,
    BookedInterviewsComponent,
    DashboardComponent,
    ReportComponent,
    CreateForumComponent,
    QuizPlayerComponent,
    QuestionComponent,
    ResumeScanHistoryComponent,
    PlansComponent,
    JobTrackerComponent,
    LandingComponent,
    MaintenanceComponent,
    CustomSliderComponent,
    WeRLaunchingComponent,
    NotAuthorizedComponent,
    AuthTwoStepsComponent,
    PageNotFoundComponent,
    CommonSplitComponent,
    ModalComponent,
    DemoComponent,
    DashHeaderComponent,
    DmComponent,
    ProfileComponent,
    ContactWhatsappComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    NgbModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      backgroundColor: "teal",
      backgroundPadding: 8,
      radius: 60,
      space: -15,
      maxPercent: 100,
      unitsColor: "#ffffff",
      outerStrokeWidth: 7.5,
      outerStrokeColor: "white",
      innerStrokeColor: "teal",
      innerStrokeWidth: 3,
      titleColor: "#ffffff",
      subtitleColor: "#ffffff"
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModule,NgbModalModule
  
  ],
  providers: [
    authInterceptorProviders,
    DatePipe,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
