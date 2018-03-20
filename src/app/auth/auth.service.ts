import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {UserService} from '../shared/user.service';
import { ErrorService } from "../error/error.service";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import {LoaderService} from '../loader/loader.service';
@Injectable()
export class AuthService {
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
              private router: Router,
              private errorService: ErrorService,
              private loaderService: LoaderService) { }

  signupUser(user: {email:string, username: string, password: string}){
    this.loaderService.handleLoader(true);
  	this.http.post(this.contactUrl + "signup", user).map((res: Response) => {
      this.loaderService.handleLoader(false);
  		const newToken = res.json();
  		return newToken;
  	})
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    })
    .subscribe(
      (token: any)=>{
        localStorage.setItem('token', token.token);
        localStorage.setItem('user', JSON.stringify(token.user));
        this.userService.setUser(token.user);
        this.router.navigate(['/']);
  	  },
      error => console.log(error)
    );
  }

  signinUser(user: {email:string, password: string}){
    this.loaderService.handleLoader(true);
  	this.http.post(this.contactUrl + "login", user).map((res: Response) => {
      this.loaderService.handleLoader(false);
  		const newToken = res.json();
  		return newToken;
  	})
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    })
    .subscribe(
      (token: any) => {
        localStorage.setItem('token', token.token);
        localStorage.setItem('user', JSON.stringify(token.user));
        this.userService.setUser(token.user);
        this.router.navigate(['/']);
  	  },
      error => console.log(error)
    );
  }

  logout() {
    localStorage.clear();
    this.userService.clearUser();
    this.router.navigate(['/']);
  }

  isAuthenticated(){
    return localStorage.getItem('token') !== null;
  }

}
