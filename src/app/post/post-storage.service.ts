import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {PostModel} from './post-model';
import 'rxjs/Rx';

@Injectable()
export class PostStorageService {
	private contactUrl = "/api/post";

  constructor(private http:Http) { }

  getPosts(){
  	return this.http.get(this.contactUrl).map((res: Response) => {
  		const allPosts: PostModel[] = res.json();
  		return allPosts;
  	});
  }

}
