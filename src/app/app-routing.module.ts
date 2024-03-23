import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

const routes: Routes = [
  {path:"",component:ThemeSwitcherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
