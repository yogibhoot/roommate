import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postroomfinder',
  templateUrl: './postroomfinder.component.html',
  styleUrls: ['./postroomfinder.component.css']
})
export class PostroomfinderComponent implements OnInit {

  constructor(
    private router : Router,
    public crudApi : FirebaseService
  ) { }

  ngOnInit(): void {
  }

  gotoprofile()
  {
    this.router.navigate(['home/userprofile']);
  }

  gotopost()
  {
    this.router.navigate(['home/userpost']);
  }

}
