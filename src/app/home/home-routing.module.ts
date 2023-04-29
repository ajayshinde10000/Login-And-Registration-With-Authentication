import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guard/auth.guard';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[HomeGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[HomeGuard]},
  { path: '**', component: ProfileComponent, canActivate:[HomeGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
