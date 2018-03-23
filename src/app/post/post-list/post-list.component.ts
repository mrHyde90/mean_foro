import { Component, OnInit} from '@angular/core';
import {PostModel} from '../post-model';
import {PostStorageService} from '../post-storage.service';
import {AuthService} from '../../auth/auth.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts: PostModel[]; 
  todabia = true;
  paginador = 0;

  constructor( private postStorageService: PostStorageService,
                private authService: AuthService) { }

  ngOnInit() {
        this.postStorageService.getPosts(this.paginador)
        .subscribe(
          (posts: PostModel[]) => {
            this.posts = posts;
            this.paginador = this.paginador + 1;
          },
          error => console.log(error)
        );
  }

  cargarPosts() {
    this.postStorageService.getPosts(this.paginador)
      .subscribe(
        (posts: PostModel[]) => {
          if(posts.length == 0){
            this.todabia = false;
          } else {
            this.paginador = this.paginador + 1;
            this.posts = this.posts.concat(posts);
          }
          console.log(this.posts.length);
        },
        error => console.log(error)
       );
  }

}
