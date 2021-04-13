import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Roomfinder } from '../../services/roomfinder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postroomfinder',
  templateUrl: './postroomfinder.component.html',
  styleUrls: ['./postroomfinder.component.css']
})
export class PostroomfinderComponent implements OnInit {

  p: number = 1;
  Roomfinder !: Roomfinder[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    private router: Router,
    public crudApi: FirebaseService
  ) { }

  ngOnInit(): void {
    this.dataState();
    let s = this.crudApi.GetRoomFinderList();
    s.snapshotChanges().subscribe(data => {
      this.Roomfinder = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //  a['$key'] = item.key;
        this.Roomfinder.push(a as Roomfinder);
      })
    })
  }

  dataState() {
    this.crudApi.GetRoomFinderList().valueChanges().subscribe(data => {
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
    this.router.navigate(['home/userprofile']);
  }

  gotopost() {
    this.router.navigate(['home/userpost']);
  }

  gotohome() {
    this.router.navigate(['home'])
  }

}
