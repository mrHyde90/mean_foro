import { Injectable } from '@angular/core';
import {PostModel} from './post-model';
import { Subject } from 'rxjs/Subject';
import {Comment} from './comment-model';

@Injectable()
export class PostService {
	posts: PostModel[];
	postsChanged = new Subject<PostModel[]>();

  constructor() { }

  //INDEX
  getAllPosts() {
  	return this.posts.slice();
  }

  //SHOW
  getPost(index: number) {
  	return this.posts[index];
  }

  //ADD COMMENT
  addComment(index: number, comment: Comment) {
    console.log("estas agregando un comentario");
    this.posts[index].comments.push({...comment});
    this.postsChanged.next(this.posts.slice());
  }

  //CREATE
  addPost(newPost: PostModel) {
  	this.posts.push(newPost);
  	this.postsChanged.next(this.posts.slice());
  }

  //DELETE
  removePost(index: number) {
  	this.posts.splice(index, 1);
  	this.postsChanged.next(this.posts.slice());
  }

  //Set the posts
  setPosts(newPosts: PostModel[]){
  	this.posts = newPosts;
  	this.postsChanged.next(this.posts.slice());
  }

  //UPDATE
  updatePost(updatePost: PostModel, index: number) {
  	this.posts[index] = updatePost;
  	this.postsChanged.next(this.posts.slice());
  }

}
