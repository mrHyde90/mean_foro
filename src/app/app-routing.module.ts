import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SinginComponent} from './auth/singin/singin.component';
import {SingupComponent} from './auth/singup/singup.component';
import {PostComponent} from './post/post.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
	{path: "", component: HomeComponent},
	{path: "signin", component: SinginComponent },
	{path: "signup", component: SingupComponent},
	{path: "post", component: PostComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}