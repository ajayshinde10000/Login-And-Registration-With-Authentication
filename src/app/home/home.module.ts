import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule
  ]
})
export class HomeModule {
  constructor(){
    console.log('Home Module Loaded');
  }
 }
