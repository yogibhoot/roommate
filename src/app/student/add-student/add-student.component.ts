import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit
 {
  public studentForm !: FormGroup;
 
  constructor(
    public crudApi: FirebaseService,
    public fb: FormBuilder,
    private router : Router
  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudentsList();
    this.studenForm();
  }

  studenForm() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    })  
  }

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
  }  
 
  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value);
    // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
   };

   gotopage(){
     this.router.navigate(['home/add-student/list-student'])
   }

}