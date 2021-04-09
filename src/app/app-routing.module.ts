import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FinderListComponent } from './finder-list/finder-list.component';
import { HomeComponent } from './home/home.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentComponent } from './rent/rent.component';
import { RoomComponent } from './room/room.component';
import { StudentListComponent } from './student-list/student-list.component';

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
    path : 'rent',
    component : RentComponent
  },
  {
    path : 'list-rent',
    component : RentListComponent
  },
  {
    path : 'room',
    component : RoomComponent
  },
  {
    path : 'list-room',
    component : FinderListComponent
  },
  {
    path : 'student',
    component : AddStudentComponent
  },
  {
    path : 'list-student',
    component : StudentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
