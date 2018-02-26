import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {PostModel} from './post-model';
import {Comment} from './comment-model';
import {PostService} from './post.service';
import {AuthService} from '../auth/auth.service';
import 'rxjs/Rx';

//crear post.service, donde se encuentre los post , el crud 
//aqui estara el crud para http

@Injectable()
export class PostStorageService {
	private contactUrl = "/api/post";

  constructor(private http:Http, 
              private postService: PostService,
              private authService: AuthService) { }

  //INDEX, /api/post
  getPosts(){
  	return this.http.get(this.contactUrl).map((res: Response) => {
  		const allPosts:PostModel[] = res.json();
      for(let post of allPosts){
        if(!post["comments"]){
          post["comments"] = [];
        }
      }
      this.postService.setPosts(allPosts);
  		return allPosts;
  	});
  }

  //CREATE POST, api/post/
  createPost(newPost: PostModel) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.post(this.contactUrl, newPost, {headers: headers}).map((res:Response) => {
      const post: PostModel = res.json();
      return post;
    });
  }

  //UPDATE APPLICTION
  updatePost(index: string, updatePost: PostModel ) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.patch(`${this.contactUrl}/${index}`, updatePost, {headers: headers}).map((res:Response)=>{
        const mensaje:string = res.json();
        return mensaje;
    });  
  }

  //DELETE POST, api/post/:id
  deletePost(index: string) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.delete(`${this.contactUrl}/${index}`, {headers: headers}).map((res: Response) => {
      const _id: string = res.json();
      return _id;
    });
  }

  //CREATE COMMENT, /api/post/:id/comment
  createComment(index: string, text: string) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.post(`${this.contactUrl}/${index}/comment`, {text: text}, {headers: headers}).map((res:Response) => {
      const newComment: Comment = res.json();
      return newComment;
    });
  }

  //DELETE COMMENT, /api/post/:idPost/comment/:idComment
  deleteComment(indexPost: string, indexComment: string){
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.delete(`${this.contactUrl}/${indexPost}/comment/${indexComment}`, {headers: headers}).map((res: Response) => {
      const message: string = res.json();
      return message;
    });
  }

}
