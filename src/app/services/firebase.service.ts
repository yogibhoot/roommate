import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Roomrent } from '../services/roomrent';
import { Roomfinder } from '../services/roomfinder';
import { Student } from '../services/student';
import { User } from "../services/user";
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from } from 'rxjs';

export class Rooms {
  body: any;
}

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

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null) ? true : false;
  }


  SignIn(email: any, password: any) {
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


  SignUp(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
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
      mobileNumber: student.mobileNumber,
      imageUrl: student.imageUrl
    })
  }

  // Create Roomrent
  AddRoomRent(roomrent: Roomrent) {
    this.roomrentsRef.push({
      userId: roomrent.userId,
      location: roomrent.location,
      rent: roomrent.rent,
      member: roomrent.member,
      gender: roomrent.gender,
      imageUrl: roomrent.imageUrl
    })
  }

  // Create Roomfinder
  AddRoomFinder(roomfinder: Roomfinder) {
    this.roomfindersRef.push({
      userId: roomfinder.userId,
      location: roomfinder.location,
      rent: roomfinder.rent,
      member: roomfinder.member,
      gender: roomfinder.gender,
      imageUrl: roomfinder.imageUrl
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
    this.studentRef = this.db.object('students-list/' + id);
    this.studentRef.remove();
  }

  DeleteRoomFinder(id: string) {
    this.roomfinderRef = this.db.object('Finder/' + id);
    this.roomfinderRef.remove();
  }

  DeleteRoomRent(id: string) {
    this.roomrentRef = this.db.object('Rooms/' + id);
    this.roomrentRef.remove();
  }

}