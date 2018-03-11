import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import {PostStorageService} from '../post-storage.service';
import {AuthService} from '../../auth/auth.service';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
	post: PostModel;
  showComments = false;
	id: string;
  user:UserModel;

  constructor(private postService: PostService, 
  			  private router: Router, 
  			  private route: ActivatedRoute,
          private postStorageService: PostStorageService,
          private authService: AuthService,
          private userService: UserService) { }

  ngOnInit() {
    console.log("iniciado");
    if(this.authService.isAuthenticated()){
      this.user = this.userService.getUser();
    }
  	this.route.params.subscribe(
  		(params: Params) => {
  			this.id = params["id"];
  			this.post = this.postService.getPost(this.id);
  		});
  }

  samePostUser(){
    console.log("Gola man");
    if(this.authService.isAuthenticated()){
      console.log("dentro del auth");
      console.log("id del usuario: " + this.user._id);
      console.log(this.post.author.username + " su id:" + this.post.author.id)
      return this.user._id == this.post.author.id;
    } else {
      return false;
    }
  }

  onShowComments(){
    this.showComments = !this.showComments;
  }

  onEditPost(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePost(){
    this.postStorageService.deletePost(this.id)
      .subscribe(
        (_id: string) => this.router.navigate(['/post']),
        error => console.log(error)
      );
  }
}
