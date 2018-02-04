import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {UserService} from '../shared/user.service';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
	token: string;
	/*
    crear nuevo usuario
    logearse
    deslogearse
    obtener token
    revisar si esta logeado
  */
  private contactUrl = "/api/auth/";

  constructor(private http: Http,
              private userService: UserService,
              private router: Router) { }

  signupUser(user: {email:string, username: string, password: string}){
  	this.http.post(this.contactUrl + "signup", user).map((res: Response) => {
  		const newToken = res.json();
  		return newToken;
  	}).subscribe((token: any)=>{
  		this.token = token.token;
      this.userService.setUser(token.user);
  		console.log(token);
      this.router.navigate(['/']);
  	});
  }

  signinUser(user: {email:string, password: string}){
  	this.http.post(this.contactUrl + "login", user).map((res: Response) => {
  		const newToken = res.json();
  		return newToken;
  	}).subscribe((token: any) => {
  		this.token = token.token;
      this.userService.setUser(token.user);
  		console.log(token);
      this.router.navigate(['/']);
  	});
  }

  logout() {
    this.userService.clearUser();
  	this.token = null;
    this.router.navigate(['/']);
  }

  getToken(){
  	return this.token;
  }

  isAuthenticated(){
  	return this.token != null;
  }

}
