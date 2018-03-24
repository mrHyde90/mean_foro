import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OwnerComponent} from './owner.component';

const ownerRoutes: Routes = [
  {path: "", component: OwnerComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ownerRoutes)
  ],
  exports: [RouterModule]
})
export class OwnerRoutingModule {}