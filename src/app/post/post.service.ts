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

  //FINDINDEX
  findIndexPost(index: string) {
    const findIndex = this.posts.findIndex(post => {
      return post._id === index;
    });
    return findIndex;
  }

  //SHOW
  getPost(index: string) {
    const findIndex = this.findIndexPost(index);
  	return this.posts[findIndex];
  }

  //ADD COMMENT
  addComment(index: string, comment: Comment) {
    const findIndex = this.findIndexPost(index);
    console.log("estas agregando un comentario");
    this.posts[findIndex].comments.push({...comment});
    this.postsChanged.next(this.posts.slice());
  }

  //CREATE
  addPost(newPost: PostModel) {
  	this.posts.push(newPost);
  	this.postsChanged.next(this.posts.slice());
  }

  //DELETE
  removePost(index: string) {
    const findIndex = this.findIndexPost(index);
  	this.posts.splice(findIndex, 1);
  	this.postsChanged.next(this.posts.slice());
  }

  //Set the posts
  setPosts(newPosts: PostModel[]){
  	this.posts = newPosts;
  	this.postsChanged.next(this.posts.slice());
  }

  //UPDATE
  updatePost(updatePost: PostModel, index: string) {
    const findIndex = this.findIndexPost(index);
  	this.posts[findIndex] = updatePost;
  	this.postsChanged.next(this.posts.slice());
  }

}
