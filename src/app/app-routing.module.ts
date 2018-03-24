import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {OwnerComponent} from './owner/owner.component';
import {UserComponent} from './user/user.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const appRoutes: Routes = [
	{path: "", component: HomeComponent},
	{path: "post", loadChildren: './post/post.module#PostModule'},
	{path: "user", component: UserComponent},
	{path: "owner", loadChildren: './owner/owner.module#OwnerModule'}
];
/*
,
	{path: "not-found", component: ErrorPageComponent, data: {message: 'message not found!'}},
  	{path: "**", redirectTo: '/not-found'}
*/
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}