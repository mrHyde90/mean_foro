import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
  	const user = {
  		email: form.value.email,
  		username: form.value.username,
  		password: form.value.password
  	}
  	this.authService.signupUser(user);
  }

}
