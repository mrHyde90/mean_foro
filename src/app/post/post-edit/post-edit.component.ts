import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import {PostStorageService} from "../post-storage.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
	@ViewChild('f') signupForm: NgForm;
	post: PostModel = {
		author: "",
		texto: "",
		title: "",
    comments: []
	}
	submitted = false;
	

  constructor(private postStorageService: PostStorageService, 
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.submitted = true;
  	this.post = this.signupForm.value;
  	this.postStorageService.createPost(this.post)
      .subscribe((newPost: PostModel) => {
      this.postService.addPost(newPost);
      this.router.navigate(["/post"]);
    });;
  }

}
