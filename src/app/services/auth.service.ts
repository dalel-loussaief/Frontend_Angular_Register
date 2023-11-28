
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../model/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   

    apiURL: string = 'http://localhost:8081/users';
    token!: string;
    private helper = new JwtHelperService();
  
    public LoggedUser!: string;
    public isLoggedIn: boolean = false;
    public roles!: string[];
    public regitredUser : User = new User();



    constructor(private router: Router, private http: HttpClient) {}
    // setRegistredUser(user: User) {
    //   throw new Error('Method not implemented.');
    // }
    setRegistredUser(user: User) {
      this.regitredUser = user;
    }
    getRegistredUser(){
      return this.regitredUser;
    }
    logout() {
      this.isLoggedIn = false;
      this.LoggedUser = undefined!;
      this.roles = undefined!;
      this.token = undefined!;
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
      this.router.navigate(['/login']);
    }
  
    isTokenExpired(): boolean {
      return this.helper.isTokenExpired(this.token);
    }
  
    signIn(user: User) {
      return this.http.post<User>(this.apiURL + '/login', user, {
        observe: 'response',
      });
    }
  
    saveToken(jwt: string) {
      localStorage.setItem('token', jwt);
      this.token = jwt;
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
      this.decodeToken();
    }
  
    decodeToken() {
      if (this.token == undefined) return;
      const decodedToken = this.helper.decodeToken(this.token);
      this.roles = decodedToken.roles;
      console.log(this.roles);
      this.LoggedUser = decodedToken.sub;
    }
  
    loadToken() {
      this.token = localStorage.getItem('token')!;
      this.decodeToken();
    }
  
    getToken(): string {
      return this.token;
    }
  
    isAdmin(): Boolean {
      if (!this.roles) return false;
      return this.roles.indexOf('ADMIN') >= 0;
    }
  
    isUser(): Boolean {
      if (!this.roles) return false;
      return this.roles.indexOf('USER') > -1;
    }
  
    getIsLoggedIn(): boolean {
      return JSON.parse(localStorage.getItem('isLoggedIn')!);
    }
    setLoggedUserFromLocalStorage(login : string) {
      this.LoggedUser = login;
      this.isLoggedIn = true;
      // this.getUserRoles(login);
  }
    // getUserRoles(username :string){
    //   this.users.forEach((curUser) => {
    //     if( curUser.username == username ) {
    //       this.roles = curUser.roles;
    //     }
    //   });
    // }
    registerUser(user :User){
      return this.http.post<User>(this.apiURL+'/register', user, {observe:'response'});
    }
    login(user : User){
      return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
    }

  //   validateEmail(code : User){

  //   return this.http.post<User>(this.apiURL+'/checkcode',code);
  // }


  // validateEmail(code : string){
  //   return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
  // }
validateEmail(email : string,verifectioncode:number):Observable<any>{
  const data={email,verifectioncode};
  console.log(data);
    return this.http.post<User>(this.apiURL+'/verifyEmail/',data);
  }

  isUserEnabledbled(username : string){
    return this.http.get(this.apiURL+'/register/isenabled/'+ username);
  }
}