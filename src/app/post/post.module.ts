import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {SharedModule} from '../shared/shared.module';

import { ShortenPipe } from '../shared/shorten.pipe';

import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-list/post-item/post-item.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { CommentComponent } from '../comment/comment.component';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';
import { CommentCreateComponent } from '../comment/comment-create/comment-create.component';
import { CommentItemComponent } from '../comment/comment-list/comment-item/comment-item.component';

import { CategoryItemComponent } from '../shared/category-item/category-item.component';

//SERVICES
import {PostStorageService} from './post-storage.service';
import {PostService} from './post.service';
import {CommentService} from '../comment/comment.service';

@NgModule({
	declarations: [
		PostComponent,
		PostListComponent,
		PostItemComponent,
		PostEditComponent,
		PostDetailComponent,
		CommentComponent,
	  	CommentListComponent,
	  	CommentCreateComponent,
	  	CommentItemComponent,
		CategoryItemComponent,
		ShortenPipe
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		PostRoutingModule,
		SharedModule
	],
	providers: [PostService, PostStorageService, CommentService]
})
export class PostModule {}