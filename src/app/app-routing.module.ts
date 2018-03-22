import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SinginComponent} from './auth/singin/singin.component';
import {SingupComponent} from './auth/singup/singup.component';
import {PostComponent} from './post/post.component';
import {HomeComponent} from './home/home.component';
import {OwnerComponent} from './owner/owner.component';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {PostDetailComponent} from './post/post-detail/post-detail.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {UserComponent} from './user/user.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const appRoutes: Routes = [
	{path: "", component: HomeComponent},
	{path: "signin", component: SinginComponent },
	{path: "signup", component: SingupComponent},
	{path: "user", component: UserComponent},
	{path: "post", component: PostComponent, children: [
		{path: "", component: PostListComponent},
		{path: "new", component: PostEditComponent},
		{path: ":id", component: PostDetailComponent},
		{path: ":id/edit", component: PostEditComponent}
	]},
	{path: "owner", component: OwnerComponent},
	{path: "not-found", component: ErrorPageComponent, data: {message: 'message not found!'}},
  	{path: "**", redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}