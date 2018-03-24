import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-list/post-item/post-item.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const postRoutes: Routes = [
  {path: "", component: PostComponent, children: [
    {path: "", component: PostListComponent},
    {path: "new", component: PostEditComponent},
    {path: ":id", component: PostDetailComponent},
    {path: ":id/edit", component: PostEditComponent}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(postRoutes)
  ],
  exports: [RouterModule]
})
export class PostRoutingModule {}