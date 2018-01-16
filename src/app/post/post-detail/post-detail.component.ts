import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {PostModel} from '../post-model';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
	post: PostModel;
	id: number;

  constructor(private postService: PostService, 
  			  private router: Router, 
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(
  		(params: Params) => {
  			this.id = +params["id"];
  			this.post = this.postService.getPost(this.id);
  		});
  }

}
