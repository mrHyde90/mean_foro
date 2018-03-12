import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SinginComponent } from './auth/singin/singin.component';
import { SingupComponent } from './auth/singup/singup.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post/post-list/post-list.component';
import {PostStorageService} from './post/post-storage.service';
import { PostItemComponent } from './post/post-list/post-item/post-item.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import {PostService} from './post/post.service';
import {AuthService} from './auth/auth.service';
import {UserService} from './shared/user.service';
import {DropdownDirective} from './shared/dropdown.directive';
import { UserComponent } from './user/user.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { CategoryItemComponent } from './shared/category-item/category-item.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentCreateComponent } from './comment/comment-create/comment-create.component';
import {CommentService} from './comment/comment.service';
import { CommentItemComponent } from './comment/comment-list/comment-item/comment-item.component';
import { ErrorComponent } from './error/error.component';
import {ErrorService} from './error/error.service';
import { LoaderComponent } from './loader/loader.component';
import {LoaderService} from './loader/loader.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SinginComponent,
    SingupComponent,
    PostComponent,
    HomeComponent,
    PostListComponent,
    PostItemComponent,
    PostEditComponent,
    PostDetailComponent,
    DropdownDirective,
    UserComponent,
    ErrorPageComponent,
    ShortenPipe,
    CategoryItemComponent,
    CommentComponent,
    CommentListComponent,
    CommentCreateComponent,
    CommentItemComponent,
    ErrorComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PostStorageService, PostService, AuthService, UserService, CommentService, ErrorService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
