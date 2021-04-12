import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { FinderListComponent } from './roomfinder/finder-list/finder-list.component';
import { HomeComponent } from './home/home.component';
import { RentListComponent } from './roomrent/rent-list/rent-list.component';
import { RentComponent } from './roomrent/rent/rent.component';
import { RoomComponent } from './roomfinder/room/room.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { from } from 'rxjs';
import { UserprofileComponent } from './userdata/userprofile/userprofile.component';
import { UserposttimelineComponent } from './userdata/userposttimeline/userposttimeline.component';
import { PostroomfinderComponent } from './userdata/postroomfinder/postroomfinder.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'home/rent',
    component : RentComponent
  },
  {
    path : 'home/rent/list-rent',
    component : RentListComponent
  },
  {
    path : 'home/room',
    component : RoomComponent
  },
  {
    path : 'home/room/list-room',
    component : FinderListComponent
  },
  {
    path : 'home/add-student',
    component : AddStudentComponent
  },
  {
    path : 'home/add-student/list-student',
    component : StudentListComponent
  },
  {
    path : 'home/add-student/edit-student',
    component : EditStudentComponent
  },
  {
    path : 'home/userprofile',
    component : UserprofileComponent
  },
  {
    path : 'home/userpost',
    component : UserposttimelineComponent
  },
  {
    path : 'home/postroomfinder',
    component : PostroomfinderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
