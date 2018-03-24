import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import {Comment} from '../../post/comment-model';
import {CommentService} from '../comment.service';
import {AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
	comment: Comment;
	id: string;

  constructor(private commentService: CommentService, 
  				private route: ActivatedRoute, 
  				private router: Router,
          private authService: AuthService) { }

  ngOnInit() {
  	this.commentService.commentIsEdit.subscribe(
  		(comment: Comment) => this.comment = comment
  	);
  	this.route.params.subscribe((params: Params) => {
  		this.id = params["id"];
  	});
  }

  onSubmitComment(form: NgForm) {
  	if(this.comment) {
  		//EDIT
  		this.commentService.updateComment(this.id, this.comment._id, form.value.text)
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      );
      this.comment = null;
  	} else {
  		//CREATE
  		this.commentService.createComment(this.id, form.value.text)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  	}
  	form.resetForm();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
