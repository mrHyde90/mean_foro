import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';

const authRoutes: Routes = [
  	{path: "signin", component: SinginComponent },
	{path: "signup", component: SingupComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}