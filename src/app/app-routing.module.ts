import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequesterHomeComponent} from './Component/Requester/requester-home/requester-home.component';
import {LoginComponent} from './Component/login/login.component';
import {ForgotPasswordComponent} from './Component/forgot-password/forgot-password.component';
import {AuthGuard} from "./Core/guard/auth.guard";
import {TmHomeComponent} from "./Component/Technical-Manager/tm-home/tm-home.component";
import {AdminGuard} from "./Core/guard/admin.guard";
import {RegistrationComponent} from "./Component/registration/registration.component";
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import {CalenderComponent} from './Component/calender/calender.component';
import { MnHomeComponent } from './Component/Manager/mn-home/mn-home.component';
import { MnGuard } from './Core/guard/mn.guard';
import { MyOrgComponent } from './Component/my-org/my-org.component';
import { ReferralsComponent } from './Component/referrals/referrals.component';
import { TransactionsComponent } from './Component/transactions/transactions.component';
import { SettingComponent } from './Component/setting/setting.component';
import { ReportsComponent } from './Component/feedback/reports/reports.component';
import { InterviewMatcherComponent } from './Component/interview-matcher/interview-matcher.component';
import { ForumComponent } from './Component/forum/forum/forum.component';
import { ForumListComponent } from './Component/forum/forum-list/forum-list.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { AnalyticsComponent } from './Component/analytics/analytics.component';
import { PracticeWithFrndsComponent } from './Component/practice-with-frnds/practice-with-frnds.component';
import { BookedInterviewsComponent } from './Component/booked-interviews/booked-interviews.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ReportComponent } from './Component/resume-scan/report/report.component';
import { CreateForumComponent } from './Component/forum/create-forum/create-forum.component';
import { QuizPlayerComponent } from './Component/test-prep/quiz-player/quiz-player.component';
import { QuizBankComponent } from './Component/test-prep/quiz-bank/quiz-bank.component';
import { ResumeScanHistoryComponent } from './Component/resume-scan/resume-scan-history/resume-scan-history.component';
import { PlansComponent } from './Component/resume-scan/plans/plans.component';
import { JobTrackerComponent } from './Component/job-tracker/job-tracker.component';
import { LandingComponent } from './Component/landing/landing.component';
import { CustomSliderComponent } from './Component/custom-slider/custom-slider.component';
import { MaintenanceComponent } from './Component/front-pages/maintenance/maintenance.component';
import { WeRLaunchingComponent } from './Component/front-pages/we-r-launching/we-r-launching.component';
import { NotAuthorizedComponent } from './Component/front-pages/not-authorized/not-authorized.component';
import { AuthTwoStepsComponent } from './Component/front-pages/auth-two-steps/auth-two-steps.component';
import { PageNotFoundComponent } from './Component/front-pages/page-not-found/page-not-found.component';
import { CommonSplitComponent } from './Component/front-pages/common-split/common-split.component';
import { DemoComponent } from './Component/demo/demo.component';
import { BlogComponent } from './Component/blog/blog.component';
import { BlogPostComponent } from './Component/blog-post/blog-post.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { AddbadgesComponent } from './Component/addbadges/addbadges.component';
import { ResumeFormComponent } from './Component/resume-manager/resume-form/resume-form.component';
import { ResumesComponent } from './Component/resume-manager/resumes/resumes.component';
import { BookmarksComponent } from './Component/bookmarks/bookmarks.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "slider",
    component: CustomSliderComponent
  },


  {
    path:"book-calendar",component:CalenderComponent,
    canActivate: [AuthGuard]

  },
  {
    path:"landing",component:LandingComponent
  },
  {
    path:"resume",component:ResumeFormComponent
  },
  {
    path:"bookmarks",component:BookmarksComponent
  },
  {
    path:"resume-list",component:ResumesComponent
  },
  {
    path:"badge",component:AddbadgesComponent
  },
  {
    path:"profile",component:ProfileComponent
  },
  { path: 'common', component: CommonSplitComponent },
  { path: 'launch', component: WeRLaunchingComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'auth-two-steps', component: AuthTwoStepsComponent },
  {
    path:"maintenance",component:MaintenanceComponent
  },
  {
    path:"analytics",component:AnalyticsComponent,
    canActivate: [AuthGuard]

  },
  {
    path:"practice-with-frnd",component:PracticeWithFrndsComponent,
    canActivate: [AuthGuard]

  },
  {
    path:"dashboard",component:DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"scan/:id",component:ReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"scan-history",component:ResumeScanHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"job-tracker",component:JobTrackerComponent
  },
  {
    path:"plans",component:PlansComponent
  },
  {
    path:"booked-interviews",component:BookedInterviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'my-org',
    component: MyOrgComponent
  },
  {
    path: 'tm-dashboard',
    component: TmHomeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "requester-home",
    component: RequesterHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "quiz-bank",
    component: QuizBankComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "quiz-test",
    component: QuizPlayerComponent,

  },
  {
    path: "forum/:id",
    component: ForumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "create-forum",
    component: CreateForumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "forum-list",
    component: ForumListComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "blog",
    component: BlogComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "blog/post/:id",
    component: BlogPostComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "matcher",
    component: InterviewMatcherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "setting",
    component: SettingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reports",
    component: ReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mn-home",
    component: MnHomeComponent,
    canActivate: [MnGuard]
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent
  },
  {
    path: "theme",
    component: ThemeSwitcherComponent
  },  
  {
    path: "demo",
    component: DemoComponent
  },
  {
    path:"reset-password",
    component:ResetPasswordComponent
  },
  {
    path:"change-password",
    component:ChangePasswordComponent},
    {
      path:"referrals",
      component:ReferralsComponent,
      canActivate: [AuthGuard]
    },
      {
        path:"transactions",
        component:TransactionsComponent,
        canActivate: [AuthGuard]
      },
  {
    path: '**',
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
