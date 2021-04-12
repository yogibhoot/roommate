import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(
    public crudApi : FirebaseService,
    private router : Router,
    private afauth : AngularFireAuth 
  ) { }

  ngOnInit(): void {

    
  }

  gotoposttime()
  {
    this.router.navigate(['home/userpost'])
  }

  gotoposttime1()
  {
    this.router.navigate(['home/postroomfinder'])
  }

}
