import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

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
    public afAuth : AngularFireAuth) {
  }
  

  ngOnInit() : void {
    this.afAuth.authState.subscribe((user)=> console.log(user));
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
 


  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)

      const email= this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.afAuth.signInWithEmailAndPassword(email,password)
      .then(res=>{
        this.isLoggedIn = true
        localStorage.setItem('user',JSON.stringify(res.user))
        this.router.navigate(['/home']);
      })
    }
    
  }

}
