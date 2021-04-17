import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User1 } from '../../services/user';
import { Router } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  imgSrc: string = '';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  userData: any;
  userId = "";

  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  User1 !: User1[];

  constructor(
    public crudApi: FirebaseService,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.userData = user;
        }
      })
    }

  ngOnInit(){ 
    this.crudApi.GetUserDataList();
    this.dataState();
    let s = this.crudApi.GetUserDataList();
    s.snapshotChanges().subscribe(data => {
      console.warn("USER1",data)
      this.User1 = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //  a['$key'] = item.key;
        // a = item.key;
        console.log("KEY+++++++>", item.key)
        this.User1.push(a as User1);
      })
    })
  }

  dataState() {
    this.crudApi.GetUserDataList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
      this.selectedImage = null;
    }
  }

  userForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })

  ResetForm() {
    this.userForm.reset();
    this.imgSrc = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
    this.isSubmitted = false;
    this.selectedImage = null;
  }

  submitUserData() {
    this.isSubmitted = true;
    var filePath = `UserImage/${this.selectedImage.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          //  formValue['imageUrl'] = url;
          this.crudApi.AddUserData({...this.userForm.value,...{ userId: this.userId }, ...{ imageUrl: url } });
          this.ResetForm();
        })
      })
    ).subscribe();
  }

  gotoposttime()
  {
    this.router.navigate(['home/userpost'])
  }

  gotoposttime1()
  {
    this.router.navigate(['home/postroomfinder'])
  }

  gotohome() {
    this.router.navigate(['home'])
  }

}
