import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Roomrent } from '../../services/roomrent';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-userposttimeline',
  templateUrl: './userposttimeline.component.html',
  styleUrls: ['./userposttimeline.component.css']
})
export class UserposttimelineComponent implements OnInit {

  Roomrent !: Roomrent[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  userData: any;
  userId = "";

  constructor(public crudApi: FirebaseService,
    public afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userData = user;
      }
    })
  }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetRoomRentList();
    s.snapshotChanges().subscribe(data => {
      this.Roomrent = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //  a['$key'] = item.key;
        // a = item.key;
        console.log("KEY+++++++>", item.key)
        this.Roomrent.push(a as Roomrent);
      })
    })
  }

  dataState() {
    this.crudApi.GetRoomRentList().valueChanges().subscribe(data => {
      console.log("userId data", data)
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

  gotoprofile() {
    this.router.navigate(['home/userprofile'])
  }

  gotohome() {
    this.router.navigate(['home'])
  }

  gotoroomfinder() {
    this.router.navigate(['home/postroomfinder'])
  }

}
