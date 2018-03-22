import { Component, OnInit, Input } from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {OwnerStorageService} from '../owner-storage.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	@Input() user: UserModel;
	@Input() deleteHandler: Function;

  constructor(private ownerService: OwnerStorageService) { }

  ngOnInit() {
  }

  deleteUser(userId: string): void{
  	this.ownerService.deleteUsers(userId).subscribe((deleteUserId: string) => {
  		this.deleteHandler(deleteUserId);
  	});
  }

}
