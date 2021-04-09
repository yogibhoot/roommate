import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

public roomrentForm !: FormGroup;
 userData = '';
Id = "";

constructor(
  public crudApi: FirebaseService,
  public afAuth : AngularFireAuth,
  public fb: FormBuilder,
  private router : Router)
  {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user.uid;
    //     console.log('ID===>',this.userData)
    //   }
    // })
  }


ngOnInit() {
  this.crudApi.GetRoomRentList();
  this.roomrentsForm();
}


roomrentsForm() {
  this.roomrentForm = this.fb.group({
    location: ['', Validators.required],
    rent: ['', Validators.required],
    member: ['', Validators.required],
    gender: ['', Validators.required]    
  })
}

get UserId() {
  return this.roomrentForm.get('userId');
}

get location() {
  return this.roomrentForm.get('location');
}

get rent() {
  return this.roomrentForm.get('rent');
}  

get member() {
  return this.roomrentForm.get('member');
}

get gender() {
  return this.roomrentForm.get('gender');
}

ResetForm() {
  this.roomrentForm.reset();
}  

submitStudentData() {
  // console.log("submitForm===>",this.roomrentForm.value)
  this.crudApi.AddRoomRent(this.roomrentForm.value);
  // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
  this.ResetForm();
 };

 Listroom()
 {
   this.router.navigate(['list-rent'])
 }

}