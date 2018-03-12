import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Comment} from '../post/comment-model';
import { Http, Response, Headers } from '@angular/http';
import {AuthService} from '../auth/auth.service';
import { ErrorService } from "../error/error.service";
import { Observable } from "rxjs";
import {LoaderService} from '../loader/loader.service';
import 'rxjs/Rx';

@Injectable()
export class CommentService{
	private comments: Comment[] = [];
	commentIsEdit = new EventEmitter<Comment>();
	commentChanged = new Subject<Comment[]>();

	private contactUrl = "/api/post";

  constructor(private http:Http, 
              private authService: AuthService,
              private errorService: ErrorService,
              private loaderService: LoaderService) { }

  findIndexComment(index: string) {
    const findIndex = this.comments.findIndex(comment => {
      return comment._id === index;
    });
    return findIndex;
  }

  //INDEX POST-COMMENT
  indexPostComment(indexPost: string){
    this.loaderService.handleLoader(true);
  	return this.http.get(`${this.contactUrl}/${indexPost}/comment/indexpost`).map((res: Response) => {
  		this.loaderService.handleLoader(false);
      this.comments = res.json();
      console.log(this.comments);
  		return this.comments.slice();
  	})
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

	//CREATE COMMENT, /api/post/:id/comment
  createComment(index: string, text: string) {
    this.loaderService.handleLoader(true);
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.post(`${this.contactUrl}/${index}/comment`, {text: text}, {headers: headers}).map((res:Response) => {
      this.loaderService.handleLoader(false);
      const newComment: Comment = res.json();
      this.comments.push(newComment);
      this.commentChanged.next(this.comments.slice());
      return newComment;
    })
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //edit
  editMessage(comment: Comment) {
        this.commentIsEdit.emit(comment);
    }

  //UPDATE COMMENT
  updateComment(indexPost: string, indexComment: string, text: string){
    this.loaderService.handleLoader(true);
  	const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.patch(`${this.contactUrl}/${indexPost}/comment/${indexComment}`, {text: text}, {headers: headers}).map((res: Response) => {
    	this.loaderService.handleLoader(false);
      const message: string = res.json();
    	const indexFound = this.findIndexComment(indexComment);
    	this.comments[indexFound].text = text;
    	this.commentChanged.next(this.comments.slice());
    	return message;
    })
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //DELETE COMMENT, /api/post/:idPost/comment/:idComment
  deleteComment(indexComment: string){
    this.loaderService.handleLoader(true);
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.delete(`${this.contactUrl}/generico/comment/${indexComment}`, {headers: headers}).map((res: Response) => {
      this.loaderService.handleLoader(false);
      const message: string = res.json();
      console.log("en el map");
      const indexFound = this.findIndexComment(indexComment);
      this.comments.splice(indexFound, 1);
      this.commentChanged.next(this.comments.slice());
      return message;
    })
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      console.log("En el catch");
      this.errorService.handleError(error.json());
      
      return Observable.throw(error.json().message);
    });
  }
	
}