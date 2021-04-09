import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Roomrent } from '../services/roomrent';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent implements OnInit {
  
  p: number = 1;
  Roomrent !: Roomrent[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  

  constructor(
    public crudApi: FirebaseService
    ){ }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetRoomRentList(); 
    s.snapshotChanges().subscribe(data => {
      this.Roomrent = [];
      console.log('DATA===',data)
      data.forEach(item => {
        console.log('ITEM===',item)
        let a = item.payload.toJSON(); 
        //  a['$key'] = item.key;
        // a = item.key;
        console.log("KEY+++++++>",a)
        this.Roomrent.push(a as Roomrent);
      })
    })
  }

  dataState() {     
    this.crudApi.GetRoomRentList().valueChanges().subscribe(data => {
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

  deleteStudent(Roomrent : any) {
    if (window.confirm('Are sure you want to delete this Roomrent ?')) { 
      this.crudApi.DeleteRoomRent(Roomrent.$key)
    }
  }

}