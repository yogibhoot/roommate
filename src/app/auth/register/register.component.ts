import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router} from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 hide: boolean = true;

  constructor(private fb: FormBuilder,
    private router : Router,
    public authService : FirebaseService,
    public afAuth : AngularFireAuth) { }

  ngOnInit(){
    // this.afAuth.authState.subscribe((user)=> console.log(user));
  }



  registerForm : FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit(){
    if (this.registerForm.valid) {

      const email= this.registerForm.value.email;
      const password = this.registerForm.value.password;

      this.authService.SignUp(email, password)
    }
  }

  gotologinpage()
    {
      this.router.navigate(['login'])
    }


}
