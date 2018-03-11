import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {PostModel} from './post-model';
import {Comment} from './comment-model';
import {PostService} from './post.service';
import {AuthService} from '../auth/auth.service';
import { ErrorService } from "../error/error.service";
import { Observable } from "rxjs";
import 'rxjs/Rx';

//crear post.service, donde se encuentre los post , el crud 
//aqui estara el crud para http

@Injectable()
export class PostStorageService {
	private contactUrl = "/api/post";

  constructor(private http:Http, 
              private postService: PostService,
              private authService: AuthService,
              private errorService: ErrorService) { }

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
  	})
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //CREATE POST, api/post/
  createPost(newPost: PostModel) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.post(this.contactUrl, newPost, {headers: headers}).map((res:Response) => {
      const post: PostModel = res.json();
      return post;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //UPDATE APPLICTION
  updatePost(index: string, updatePost: PostModel ) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.patch(`${this.contactUrl}/${index}`, updatePost, {headers: headers}).map((res:Response)=>{
        const mensaje:string = res.json();
        return mensaje;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    }); 
  }

  //DELETE POST, api/post/:id
  deletePost(index: string) {
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.delete(`${this.contactUrl}/${index}`, {headers: headers}).map((res: Response) => {
      const _id: string = res.json();
      return _id;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

}
