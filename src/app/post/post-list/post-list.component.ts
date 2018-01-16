import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import { Subscription } from 'rxjs/Subscription';
import {PostStorageService} from '../post-storage.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: PostModel[]; 
  subscription: Subscription;

  constructor( private postService: PostService, private postStorageService: PostStorageService) { }

  ngOnInit() {
    this.subscription = this.postService.postsChanged
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
      });
      this.postStorageService.getPosts();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
