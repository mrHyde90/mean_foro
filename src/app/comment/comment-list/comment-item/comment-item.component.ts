import { Component, OnInit, Input } from '@angular/core';
import {CommentService} from '../../comment.service';
import {Comment} from '../../../post/comment-model';
import {AuthService} from '../../../auth/auth.service';
import {UserModel} from '../../../shared/user-model';
import {UserService} from '../../../shared/user.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
	@Input("comentario")comment: Comment;
	user: UserModel;

  constructor(private commentService: CommentService,
  				private authService: AuthService,
  				private userService: UserService) { }

  ngOnInit() {
  	if(this.authService.isAuthenticated()){
  		this.user = this.userService.getUser();
  	}
  }

  onEditComment() {
  	this.commentService.editMessage(this.comment);
  }

  onDeleteComment() {
  	this.commentService.deleteComment(this.comment._id)
    .subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

  sameCommentUser() {
  	if(this.authService.isAuthenticated()) {
  		return this.user._id == this.comment.author.id;
  	} else {
  		return false;
  	}
  }

}
