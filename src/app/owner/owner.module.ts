import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {OwnerRoutingModule} from './owner-routing.module';

import { OwnerComponent } from './owner.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

//SERVICIOS
import {OwnerStorageService} from './owner-storage.service';

@NgModule({
	declarations: [
		OwnerComponent,
		UserDetailComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		OwnerRoutingModule
	],
	providers: [OwnerStorageService]
})
export class OwnerModule {}