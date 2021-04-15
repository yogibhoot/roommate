import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  title = "cloudsSorage";
  // selectedFile : File = null;
  fb : any;
  downloadURL !: Observable<string>;

  constructor(
    public crudApi : FirebaseService,
    private router : Router,
    private afauth : AngularFireAuth,
    private storage: AngularFireStorage) {}

  ngOnInit(): void { }

  onFileSelected(event : any) {
    // var n = Date.now();
    // const file = event.target.files[0];
    // const filePath = `UserImages/${n}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(`UserImages/${n}`, file);
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe(url => {
    //         if (url) {
    //           this.fb = url;
    //         }
    //         console.log(this.fb);
    //       });
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {
    //       console.log(url);
    //     }
    //   });
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
