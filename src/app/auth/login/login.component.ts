import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  isLoggedIn = false;
  constructor(private fb: FormBuilder,
    private router:Router,
    public afAuth : AngularFireAuth,
    public authService: FirebaseService) {
  }
  

  ngOnInit() : void {
    // this.afAuth.authState.subscribe((user)=> console.log(user));
  }

  // loginForm: FormGroup = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]]
  // })

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  gotopage()
  {
    this.router.navigate(['register'])
  }

 

  onLogin() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value)

      const email= this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.SignIn(email,password);
    }
    
  }

  // onLogin(formData: FormGroup) {
  //   if (formData.valid) {
  //     this.afAuth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
  //       .then(loginResponse => {
  //         console.log(loginResponse.user);
  //         this.router.navigate(['/home']);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }

}
