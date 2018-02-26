import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserModel} from '../shared/user-model';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
	user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.user = this.userService.getUser();
  }

  ngOnDestroy(){
  	console.log("usuario destruido");
  }

}
