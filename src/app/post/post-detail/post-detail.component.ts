import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Comment} from '../comment-model';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import {PostStorageService} from '../post-storage.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
	post: PostModel;
  comment: Comment = {
    text: "",
    author: ""
  };
	id: string;

  constructor(private postService: PostService, 
  			  private router: Router, 
  			  private route: ActivatedRoute,
          private postStorageService: PostStorageService) { }

  ngOnInit() {
  	this.route.params.subscribe(
  		(params: Params) => {
  			this.id = params["id"];
  			this.post = this.postService.getPost(this.id);
  		});
  }

  addComment() {
    //this.postService.addComment(this.id, this.comment);
    this.postStorageService.createComment(this.id, this.comment).subscribe(
      (newComment: Comment) => {
        this.postService.addComment(this.id, newComment);
      }
    );
    this.comment = {
      text: "",
      author: ""
    };
  }

}
