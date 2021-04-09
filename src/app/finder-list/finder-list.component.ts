import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Roomfinder } from '../services/roomfinder';

@Component({
  selector: 'app-finder-list',
  templateUrl: './finder-list.component.html',
  styleUrls: ['./finder-list.component.css']
})
export class FinderListComponent implements OnInit {
  p: number = 1;
  Roomfinder !: Roomfinder[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  

  constructor(
    public crudApi: FirebaseService
    ){ }


  ngOnInit() {
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
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  // deleteStudent(Roomrent : any) {
  //   if (window.confirm('Are sure you want to delete this Roomrent ?')) { 
  //     this.crudApi.DeleteRoomRent(Roomrent.$key)
  //   }
  // }

}