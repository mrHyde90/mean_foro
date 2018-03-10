import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Comment} from '../post/comment-model';
import { Http, Response, Headers } from '@angular/http';
import {AuthService} from '../auth/auth.service';
import 'rxjs/Rx';
@Injectable()
export class CommentService{
	private comments: Comment[] = [];
	commentIsEdit = new EventEmitter<Comment>();
	commentChanged = new Subject<Comment[]>();

	private contactUrl = "/api/post";

  constructor(private http:Http, 
              private authService: AuthService) { }

  findIndexComment(index: string) {
    const findIndex = this.comments.findIndex(comment => {
      return comment._id === index;
    });
    return findIndex;
  }

  //INDEX POST-COMMENT
  indexPostComment(indexPost: string){
  	return this.http.get(`${this.contactUrl}/${indexPost}/comment/indexpost`).map((res: Response) => {
  		this.comments = res.json();
      console.log(this.comments);
  		return this.comments.slice();
  	})
  }

	//CREATE COMMENT, /api/post/:id/comment
  createComment(index: string, text: string) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.post(`${this.contactUrl}/${index}/comment`, {text: text}, {headers: headers}).map((res:Response) => {
      const newComment: Comment = res.json();
      this.comments.push(newComment);
      this.commentChanged.next(this.comments.slice());
      return newComment;
    });
  }

  //edit
  editMessage(comment: Comment) {
        this.commentIsEdit.emit(comment);
    }

  //UPDATE COMMENT
  updateComment(indexPost: string, indexComment: string, text: string){
  	const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.patch(`${this.contactUrl}/${indexPost}/comment/${indexComment}`, {text: text}, {headers: headers}).map((res: Response) => {
    	const message: string = res.json();
    	const indexFound = this.findIndexComment(indexComment);
    	this.comments[indexFound].text = text;
    	this.commentChanged.next(this.comments.slice());
    	return message;
    });
  }

  //DELETE COMMENT, /api/post/:idPost/comment/:idComment
  deleteComment(indexComment: string){
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.delete(`${this.contactUrl}/generico/comment/${indexComment}`, {headers: headers}).map((res: Response) => {
      const message: string = res.json();
      const indexFound = this.findIndexComment(indexComment);
      this.comments.splice(indexFound, 1);
      this.commentChanged.next(this.comments.slice());
      return message;
    });
  }
	
}