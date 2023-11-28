import { Component, OnInit } from '@angular/core';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user = new User();
  error: number=0;
  enabled: any;
  err: any;


  constructor(private authService : AuthService,private router: Router){

  }
  ngOnInit(): void {
      
  }
  onLoggedin() {
  /*  console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
if (isValidUser)
this.router.navigate(['/']);
else
//alert('Login ou mot de passe incorrecte!');
this.erreur=1;
}*/
  this.authService.signIn(this.user).subscribe({
  next: (response) => {
    let jwt = response.headers.get('Authorization')!;
    this.authService.saveToken(jwt);
    this.authService.isLoggedIn = true;
    this.router.navigate(['/vetements']);
},
error: (err: any) => {
  this.error = 1;
  console.log(err);
}
  });
}}
