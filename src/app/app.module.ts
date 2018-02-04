import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';

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
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [PostStorageService, PostService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
