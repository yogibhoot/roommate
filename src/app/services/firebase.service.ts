import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Roomrent } from '../services/roomrent';
import { Roomfinder } from '../services/roomfinder';
import { Student } from '../services/student';
import { User } from "../services/user";
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class FirebaseService {

  studentsRef !: AngularFireList<any>;
  studentRef !: AngularFireObject<any>;
 
  roomrentsRef!: AngularFireList<any>;
  roomrentRef!: AngularFireObject<any>;

  roomfindersRef!: AngularFireList<any>;
  roomfinderRef!: AngularFireObject<any>;

  userData: any; // Save logged in user data
  
  constructor(private db: AngularFireDatabase,
    public router: Router,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user') || '{}');
          } else {
            localStorage.setItem('user', " ");
            JSON.parse(localStorage.getItem('user') || '{}');
          }
        })
      }
      
    
    /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user : any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

     // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null) ? true : false;
  }

    // Sign in with email/password
  SignIn(email : any, password : any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
                  this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email : any, password : any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SetUserData(result.user);
        this.router.navigate(['login'])
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  
   // Create Student
   AddStudent(student: Student) {
    this.studentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    })
  }

  // Create Roomrent
  AddRoomRent(roomrent: Roomrent) {
    this.roomrentsRef.push({
      userId : roomrent.userId,
      location: roomrent.location,
      rent: roomrent.rent,
      member: roomrent.member,
      gender: roomrent.gender
    })
  }

  // Create Roomfinder
  AddRoomFinder(roomfinder: Roomfinder) {
    this.roomfindersRef.push({
      userId : roomfinder.userId,
      location: roomfinder.location,
      rent: roomfinder.rent,
      member: roomfinder.member,
      gender: roomfinder.gender
    })
  }

  // Fetch Single RoomRent Object
  GetRoomRent(id: string) {
    this.roomrentRef = this.db.object('Rooms/' + id);
    return this.roomrentRef;
  }

  // Fetch RoomRent List
  GetRoomRentList() {
    this.roomrentsRef = this.db.list('Rooms');
    return this.roomrentsRef;
  }  

  // Fetch RoomRent using userID List
  GetUserRoomRentList(id: string) {
    this.roomrentsRef = this.db.list('Rooms/' + id);
    return this.roomrentsRef;
  } 

  // Fetch RoomFinder List
  GetRoomFinderList() {
    this.roomfindersRef = this.db.list('Finder');
    return this.roomfindersRef;
  } 

   // Fetch Single RoomFinder Object
   GetRoomFinder(id: string) {
    this.roomfinderRef = this.db.object('Finder/' + id);
    return this.roomfinderRef;
  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }  
  
  // Update Student Object
  UpdateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    })
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('students-list/'+id);
    this.studentRef.remove();
  }

  DeleteRoomFinder(id: string) { 
    this.roomfinderRef = this.db.object('Finder/'+id);
    this.roomfinderRef.remove();
  }

  DeleteRoomRent(id: string) { 
    this.roomrentRef = this.db.object('Rooms/'+id);
    this.roomrentRef.remove();
  }

}