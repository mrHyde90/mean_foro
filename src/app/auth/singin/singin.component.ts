import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
  	const user = {
  		email: form.value.email,
  		password: form.value.password
  	};
  	this.authService.signinUser(user);
  }

}
