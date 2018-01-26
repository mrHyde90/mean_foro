import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {PostModel} from './post-model';
import {Comment} from './comment-model';
import {PostService} from './post.service';
import 'rxjs/Rx';

//crear post.service, donde se encuentre los post , el crud 
//aqui estara el crud para http

@Injectable()
export class PostStorageService {
	private contactUrl = "/api/post";

  constructor(private http:Http, private postService: PostService) { }

  //INDEX
  getPosts(){
  	this.http.get(this.contactUrl).map((res: Response) => {
  		const allPosts = res.json();
      for(let post of allPosts){
        if(!post["comments"]){
          post["comments"] = [];
        }
      }
  		return allPosts;
  	}).subscribe((posts: PostModel[]) => {
  		this.postService.setPosts(posts);
  	});
  }

  //CREATE
  createPost(newPost: PostModel) {
    return this.http.post(this.contactUrl, newPost).map((res:Response) => {
      const post: PostModel = res.json();
      return post;
    })
  }

  //CREATE COMMENT /api/post/:id/comment
  createComment(index: string, comment: Comment) {
    return this.http.post(`${this.contactUrl}/${index}/comment`, comment).map((res:Response) => {
      const newComment: Comment = res.json();
      return newComment;
    });
  }

}
