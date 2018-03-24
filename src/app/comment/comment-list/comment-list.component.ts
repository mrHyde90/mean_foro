import { Component, OnInit, OnDestroy } from '@angular/core';
import {CommentService} from '../comment.service';
import { Subscription } from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Comment} from '../../post/comment-model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
	comments: Comment[];
	id: string;
	subscription: Subscription;

  constructor(private commentService: CommentService,
  				private route: ActivatedRoute,
  				private router: Router,
          private authService: AuthService) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params) => {
  			console.log("Primero");
  			this.id = params["id"];
        console.log(this.id);
  		});

  	this.commentService.indexPostComment(this.id)
  		.subscribe(
        (comments: Comment[]) => {
  			  console.log("Segundo");
  			  this.comments = comments.reverse();
  		  },
        error => console.log(error)
      );

  	this.subscription = this.commentService.commentChanged
  		.subscribe((comments: Comment[]) => {
  			this.comments = comments.reverse();
  		});
  }

  ngOnDestroy() {
  	console.log("Adios");
  	this.subscription.unsubscribe();
  }

}

/*
   crear el search-
   optimizar 
   estilizar el contenido
*/