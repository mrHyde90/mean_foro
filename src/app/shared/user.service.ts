import { Injectable } from '@angular/core';
import {UserModel} from './user-model';

@Injectable()
export class UserService {
	user: UserModel;

  constructor() { }

  setUser(newUser: UserModel){
  	this.user = newUser;
  }

  getUser() {
  	return this.user;
  }

  clearUser(){
  	this.user = null;
  }

}
