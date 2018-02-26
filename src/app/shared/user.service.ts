import { Injectable } from '@angular/core';
import {UserModel} from './user-model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
	user: UserModel;
  userChanged = new Subject<UserModel>();

  constructor() { }

  setUser(newUser: UserModel){
  	this.user = newUser;
    this.userChanged.next(newUser);
  }

  getUser() {
  	return this.user;
  }

  clearUser(){
  	this.user = null;
  }

}
