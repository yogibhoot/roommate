import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // userData = " ";


  constructor(private router : Router,
    public afAuth : AngularFireAuth,
    public authService: FirebaseService,
    public ngZone : NgZone)
     { }

  ngOnInit()
  {
    // this.afAuth.authState.subscribe((user)=> console.log(user));

    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     // this.userData = user.email;
    //     console.log(user);
    //   }
    // });

    // this.afAuth.currentUser.then(res=>{
    //   console.warn(res?.uid)
    // })
  }

  // signout(){
  //   console.log('logout')
  //   this.afAuth.signOut()
  //   .then(res=>{
  //     localStorage.removeItem('user')
  //     this.router.navigate(['/login'])
  //   })
  //   .catch(error => {
  //         console.log(error);
  //       });
  // }

  gotorent()
  {
    this.router.navigate(['home/rent'])
  }

  gotostudent()
  {
    this.router.navigate(['home/add-student'])
  }

  gotoprofile()
  {
    this.router.navigate(['home/userprofile'])
  }

  gotoroom()
  {
    this.router.navigate(['home/room'])
  }

}