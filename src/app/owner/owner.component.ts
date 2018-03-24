import { Component, OnInit } from '@angular/core';
import {UserModel} from '../shared/user-model';
import {OwnerStorageService} from './owner-storage.service';
import 'rxjs/Rx';
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
	users: UserModel[];
	selectedUser: UserModel;
  constructor(private ownerStorageService: OwnerStorageService) { }

  ngOnInit() {
  	this.ownerStorageService.indexUsers()
  		.subscribe((users: UserModel[]) => this.users = users,
  					error => console.log(error));
  }

  selectUser(usuario: UserModel) {
  	this.selectedUser = usuario;
  }

  private getIndexOfUser = (userId: String) => {
  	return this.users.findIndex((user) => {
  		return user._id == userId;
  	})
  }

  deleteUser = (userId: string) => {
  	var idx = this.getIndexOfUser(userId);
  	if(idx !== -1){
  		this.users.splice(idx, 1);
  		this.selectUser(null);
  	}
  	return this.users;
  }

}
