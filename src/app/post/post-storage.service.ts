import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {PostModel} from './post-model';
import {Comment} from './comment-model';
import {PostService} from './post.service';
import {AuthService} from '../auth/auth.service';
import { ErrorService } from "../error/error.service";
import { Observable } from "rxjs";
import 'rxjs/Rx';
import {LoaderService} from '../loader/loader.service';
//crear post.service, donde se encuentre los post , el crud 
//aqui estara el crud para http

@Injectable()
export class PostStorageService {
	private contactUrl = "/api/post";

  constructor(private http:Http, 
              private postService: PostService,
              private authService: AuthService,
              private errorService: ErrorService,
              private loaderService: LoaderService) { }

  //INDEX, /api/post
  getPosts(){
    this.loaderService.handleLoader(true);
  	return this.http.get(this.contactUrl).map((res: Response) => {
  		const allPosts:PostModel[] = res.json();
      for(let post of allPosts){
        if(!post["comments"]){
          post["comments"] = [];
        }
      }
      this.postService.setPosts(allPosts);
      this.loaderService.handleLoader(false);
  		return allPosts;
  	})
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //CREATE POST, api/post/
  createPost(newPost: PostModel) {
    this.loaderService.handleLoader(true);
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.post(this.contactUrl, newPost, {headers: headers}).map((res:Response) => {
      const post: PostModel = res.json();
      this.loaderService.handleLoader(false);
      return post;
    })
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //UPDATE APPLICTION
  updatePost(index: string, updatePost: PostModel ) {
    this.loaderService.handleLoader(true);
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.patch(`${this.contactUrl}/${index}`, updatePost, {headers: headers}).map((res:Response)=>{
        this.loaderService.handleLoader(false);
        const mensaje:string = res.json();
        return mensaje;
    })
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    }); 
  }

  //DELETE POST, api/post/:id
  deletePost(index: string) {
    this.loaderService.handleLoader(true);
    const token = this.authService.getToken();
    const headers = new Headers({'authorization': `bearer ${token}`});
    return this.http.delete(`${this.contactUrl}/${index}`, {headers: headers}).map((res: Response) => {
      this.loaderService.handleLoader(false);
      const _id: string = res.json();
      return _id;
    })
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

}
