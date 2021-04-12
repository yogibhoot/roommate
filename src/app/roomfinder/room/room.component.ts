import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import {  FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public roomfinderForm !: FormGroup;
  userData : any;
  userId = "";
 
  constructor(
    public crudApi: FirebaseService,
    public afAuth : AngularFireAuth,
    public fb: FormBuilder,
    private router : Router
  ) {
    this.afAuth.authState.subscribe(user =>{
      if(user)
      {
        this.userId = user.uid;
        this.userData = user;
      }
    })
   }
  
  
  ngOnInit() {
    this.crudApi.GetRoomFinderList();
    this.roomfindersForm();
  }
  
  roomfindersForm() {
    this.roomfinderForm = this.fb.group({
      location: ['', Validators.required],
      rent: ['', Validators.required],
      member: ['', Validators.required],
      gender: ['', Validators.required]
    })  
  }

  get UserId() {
    return this.roomfinderForm.get('userId');
  }
  
  get location() {
    return this.roomfinderForm.get('location');
  }
  
  get rent() {
    return this.roomfinderForm.get('rent');
  }  
  
  get member() {
    return this.roomfinderForm.get('member');
  }
  
  get gender() {
    return this.roomfinderForm.get('gender');
  }
  
  ResetForm() {
    this.roomfinderForm.reset();
  }  
  
  submitStudentData() {
    this.crudApi.AddRoomFinder({...this.roomfinderForm.value, ...{userId : this.userId}});
    // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
   };

   RoomFinder()
   {
     this.router.navigate(['home/room/list-room'])
   }
  
  }