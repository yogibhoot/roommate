import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {


  imgSrc: string = "/src/assets/img/userphoto.jpg";
  selectedImage: any = null;
  isSubmitted: boolean = false;

  constructor(
    public crudApi: FirebaseService,
    // public fb: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage
  ) { }


  ngOnInit() {
    this.crudApi.GetStudentsList();
    // this.studenForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/mikhail-vasilyev-gGC63oug3iY-unsplash.jpg';
      this.selectedImage = null;
    }
  }

  // studenForm() {
  //   this.studentForm = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', Validators.required],
  //     mobileNumber: ['', Validators.required],
  //     imageUrl: ['', Validators.required]
  //   })  
  // }

  studentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })

  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get mobileNumber() {
    return this.studentForm.get('mobileNumber');
  }

  ResetForm() {
    this.studentForm.reset();
    this.studentForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: ''
    });
    this.imgSrc = '/assets/img/mikhail-vasilyev-gGC63oug3iY-unsplash.jpg';
    this.isSubmitted = false;
    this.selectedImage = null;
  }

  // submitStudentData() {
  //   this.crudApi.AddStudent(this.studentForm.value);
  //   // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
  //   this.ResetForm();
  //  };

  submitStudentData() {
    this.isSubmitted = true;
    var filePath = `student/${this.selectedImage.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          //  formValue['imageUrl'] = url;
          this.crudApi.AddStudent({ ...this.studentForm.value, ...{ imageUrl: url } });
          this.ResetForm();
        })
      })
    ).subscribe();
  }

  gotopage() {
    this.router.navigate(['home/add-student/list-student'])
  }

}