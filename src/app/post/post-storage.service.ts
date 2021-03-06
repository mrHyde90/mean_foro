import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import {PostModel} from './post-model';
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
              private errorService: ErrorService,
              private loaderService: LoaderService) { }

  //INDEX, /api/post
  getPosts(paginador: Number){
    this.loaderService.handleLoader(true);
    let params = new URLSearchParams();
    params.set('pagina', paginador.toString());
  	return this.http.get(this.contactUrl, {params: params}).map((res: Response) => {
  		const allPosts:PostModel[] = res.json();
      for(let post of allPosts){
        if(!post["comments"]){
          post["comments"] = [];
        }
      }
      this.loaderService.handleLoader(false);
  		return allPosts;
  	})
    .catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //SHOW, api/post/:id
  showPost(index:string){
    this.loaderService.handleLoader(true);
    return this.http.get(`${this.contactUrl}/${index}`).map((res:Response)=>{
      console.log("Aver");
      const post: PostModel = res.json();
      console.log("Estas son las categorias");
      console.log(post);
      console.log(post.categories);
      this.loaderService.handleLoader(false);
      return post;
    })
    .catch((error:Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //CREATE POST, api/post/
  createPost(newPost: PostModel) {
    this.loaderService.handleLoader(true);
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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
