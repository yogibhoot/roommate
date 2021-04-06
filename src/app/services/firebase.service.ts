import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  constructor(public firebaseauth : AngularFireAuth) { }

  async signin( email : string, password : string)
  {
    await this.firebaseauth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  async signup( email : string, password : string)
  {
    await this.firebaseauth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  logout()
  {
    this.firebaseauth.signOut()
    localStorage.removeItem('user')
  }

}
