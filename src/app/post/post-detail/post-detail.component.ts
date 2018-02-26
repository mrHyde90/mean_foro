import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Comment} from '../comment-model';
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
  comment: string;
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

  addComment() {
    this.postStorageService.createComment(this.id, this.comment).subscribe(
      (newComment: Comment) => {
        this.postService.addComment(this.id, newComment);
        this.comment = "";
      }
    );
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

  onEditPost(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePost(){
    this.postStorageService.deletePost(this.id).subscribe((_id: string) => {
      console.log(_id);
      this.router.navigate(['/post']);
    });
  }
}
