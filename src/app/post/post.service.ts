import { Injectable } from '@angular/core';
import {PostModel} from './post-model';
import {Comment} from './comment-model';

@Injectable()
export class PostService {
	posts: PostModel[];

  constructor() { }

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
    this.posts[findIndex].comments.push(comment);
  }

  //CREATE
  addPost(newPost: PostModel) {
  	this.posts.push(newPost);
  }

  //Set the posts
  setPosts(newPosts: PostModel[]){
  	this.posts = newPosts;
  }

  //UPDATE
  updatePost(updatePost: PostModel, index: string) {
    const findIndex = this.findIndexPost(index);
  	this.posts[findIndex].title = updatePost.title;
    this.posts[findIndex].texto = updatePost.texto;
  }

}
