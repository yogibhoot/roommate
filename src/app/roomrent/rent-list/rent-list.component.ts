import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Roomrent } from '../../services/roomrent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent implements OnInit {

  Roomrent !: Roomrent[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  restoProfileData !: AngularFireList<Roomrent[]>;
  restoProfileRef !: AngularFireList<Roomrent[]>;


  constructor(
    public crudApi: FirebaseService,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    private router: Router
  ) { }

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

  gotohome() {
    this.router.navigate(['home'])
  }

  deleteStudent(Roomrent: any) {
    if (window.confirm('Are sure you want to delete this Roomrent ?')) {
      this.crudApi.DeleteRoomRent(Roomrent.$key)
    }
  }

}