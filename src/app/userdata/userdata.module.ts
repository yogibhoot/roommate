import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from '../userdata/userprofile/userprofile.component';
import { from } from 'rxjs';
import { UserposttimelineComponent } from './userposttimeline/userposttimeline.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { PostroomfinderComponent } from './postroomfinder/postroomfinder.component';



@NgModule({
  declarations: [
    UserprofileComponent,
    UserposttimelineComponent,
    PostroomfinderComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    UserprofileComponent,
    UserposttimelineComponent,
    PostroomfinderComponent
  ]
})
export class UserdataModule { }
