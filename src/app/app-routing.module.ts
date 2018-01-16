import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SinginComponent} from './auth/singin/singin.component';
import {SingupComponent} from './auth/singup/singup.component';
import {PostComponent} from './post/post.component';
import {HomeComponent} from './home/home.component';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {PostDetailComponent} from './post/post-detail/post-detail.component';
import {PostListComponent} from './post/post-list/post-list.component';

const appRoutes: Routes = [
	{path: "", component: HomeComponent},
	{path: "signin", component: SinginComponent },
	{path: "signup", component: SingupComponent},
	{path: "post", component: PostComponent, children: [
		{path: "", component: PostListComponent},
		{path: "new", component: PostEditComponent},
		{path: ":id", component: PostDetailComponent},
		{path: ":id/edit", component: PostEditComponent}
	]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}