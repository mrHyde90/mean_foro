import { Component, OnInit} from '@angular/core';
import {PostModel} from '../post-model';
import {PostStorageService} from '../post-storage.service';
import {PostService} from '../post.service';
import {AuthService} from '../../auth/auth.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts: PostModel[]; 

  constructor( private postService: PostService, 
                private postStorageService: PostStorageService,
                private authService: AuthService) { }

  ngOnInit() {
        this.postStorageService.getPosts()
        .subscribe(
          (posts: PostModel[]) => this.posts = posts,
          error => console.log(error)
        );
  }

}
