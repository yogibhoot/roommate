import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public roomfinderForm !: FormGroup;
 
  constructor(
    public crudApi: FirebaseService,
    public fb: FormBuilder,
    private router : Router
  ) { }
  
  
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
    this.crudApi.AddRoomFinder(this.roomfinderForm.value);
    // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
   };

   RoomFinder()
   {
     this.router.navigate(['list-room'])
   }
  
  }