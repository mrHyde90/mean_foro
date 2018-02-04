import { Component, OnInit, OnDestroy} from '@angular/core';
import {PostModel} from '../post-model';
import {PostStorageService} from '../post-storage.service';
import {PostService} from '../post.service';
import { Subscription } from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: PostModel[]; 
  subscription: Subscription;

  constructor( private postService: PostService, 
                private postStorageService: PostStorageService,
                private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.postService.postsChanged
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
      });
      
      this.postStorageService.getPosts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
