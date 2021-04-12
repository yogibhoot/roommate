import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Roomrent } from '../../services/roomrent';
import { map } from 'rxjs/operators';

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
  

  constructor(
    public crudApi: FirebaseService
    ){ }

    // getUser()
    // {
    //   return this.db.list(`Rooms`)
    //   .snapshotChanges()
    //   .pipe(map(items => { 
    //     this.Roomrent = [];            // <== new way of chaining
    //     return items.map(a => {
    //       const data = a.payload.val();
    //       const key = a.payload.key;
    //       return {key, data};           // or {key, ...data} in case data is Obj
    //     });
    //   }));
    // }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetRoomRentList(); 
    s.snapshotChanges().subscribe(data => {
      this.Roomrent = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        //  a['$key'] = item.key;
        // a = item.key;
        console.log("KEY+++++++>",item.key)
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