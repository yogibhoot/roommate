import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  // public roomrentForm !: FormGroup;
  imgSrc: string = "";
  selectedImage: any = null;
  isSubmitted: boolean = false;
  userData: any;
  userId = "";

  constructor(
    public crudApi: FirebaseService,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    public fb: FormBuilder,
    private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userData = user;
      }
    })
  }


  ngOnInit() {
    this.crudApi.GetRoomRentList();
    // this.roomrentsForm();
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


  // roomrentsForm() {
  //   this.roomrentForm = this.fb.group({
  //     location: ['', Validators.required],
  //     rent: ['', Validators.required],
  //     member: ['', Validators.required],
  //     gender: ['', Validators.required]
  //   })
  // }

  roomrentForm = new FormGroup({
    location: new FormControl('', Validators.required),
    rent: new FormControl('', Validators.required),
    member: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })

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
    this.roomrentForm.setValue({
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
  //   // console.log("submitForm===>",this.roomrentForm.value)
  //   this.crudApi.AddRoomRent({ ...this.roomrentForm.value, ...{ userId: this.userId } });
  //   // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
  //   this.ResetForm();
  // };

  submitStudentData() {
    this.isSubmitted = true;
    var filePath = `RoomRent/${this.selectedImage.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          //  formValue['imageUrl'] = url;
          this.crudApi.AddRoomRent({ ...this.roomrentForm.value,...{ userId: this.userId }, ...{ imageUrl: url } });
          this.ResetForm();
        })
      })
    ).subscribe();
  }

  Listroom() {
    this.router.navigate(['home/rent/list-rent'])
  }

}