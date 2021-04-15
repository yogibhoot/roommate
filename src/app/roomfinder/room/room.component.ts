import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import {  FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  // public roomfinderForm !: FormGroup;
  imgSrc: string = "";
  selectedImage: any = null;
  isSubmitted: boolean = false;
  userData : any;
  userId = "";
 
  constructor(
    public crudApi: FirebaseService,
    public afAuth : AngularFireAuth,
    private storage: AngularFireStorage,
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
    // this.roomfindersForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/mikhail-vasilyev-gGC63oug3iY-unsplash.jpg';
      this.selectedImage = null;
    }
  }
  
  // roomfindersForm() {
  //   this.roomfinderForm = this.fb.group({
  //     location: ['', Validators.required],
  //     rent: ['', Validators.required],
  //     member: ['', Validators.required],
  //     gender: ['', Validators.required]
  //   })  
  // }

  roomfinderForm = new FormGroup({
    location: new FormControl('', Validators.required),
    rent: new FormControl('', Validators.required),
    member: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })

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
    this.roomfinderForm.setValue({
      location: '',
      rent: '',
      member: '',
      return: ''
    });
    this.imgSrc = '/assets/img/mikhail-vasilyev-gGC63oug3iY-unsplash.jpg';
    this.isSubmitted = false;
    this.selectedImage = null;
  }  
  
  // submitStudentData() {
  //   this.crudApi.AddRoomFinder({...this.roomfinderForm.value, ...{userId : this.userId}});
  //   // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
  //   this.ResetForm();
  //  };

  submitStudentData() {
    this.isSubmitted = true;
    var filePath = `RoomFinder/${this.selectedImage.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          //  formValue['imageUrl'] = url;
          this.crudApi.AddRoomFinder({ ...this.roomfinderForm.value,...{ userId: this.userId }, ...{ imageUrl: url } });
          this.ResetForm();
        })
      })
    ).subscribe();
  }

   RoomFinder()
   {
     this.router.navigate(['home/room/list-room'])
   }
  
  }