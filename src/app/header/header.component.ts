import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../shared/user.service';
import {UserModel} from '../shared/user-model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	user: UserModel;
	subscription: Subscription;

  constructor(private authService: AuthService,
  				private userService: UserService) { }

  ngOnInit() {
    console.log(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')));

  	this.subscription = this.userService.userChanged
      .subscribe((user: UserModel) => {
        this.user = user;
      });
    this.userService.setUser(JSON.parse(localStorage.getItem('user')));
  }

  isAdmin() {
    if(this.authService.isAuthenticated()) {
      console.log("Estoy dentro");
      console.log(this.user.user_type);
      return this.user.user_type == 'Admin';
    }
  }

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

  onLogout(){
  	this.authService.logout();
  }

}
