import { Component, OnInit } from '@angular/core';
import {PostModel} from '../post-model';
import {PostStorageService} from '../post-storage.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
	posts: PostModel[];

  constructor(private postStorageService: PostStorageService) { }

  ngOnInit() {
  	this.postStorageService.getPosts().subscribe((posts: PostModel[]) => {
  		this.posts = posts;
  	});
  }

}
