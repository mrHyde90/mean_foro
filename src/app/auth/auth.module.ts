import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import {SharedModule} from '../shared/shared.module';

import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
	declarations: [
		SinginComponent,
		SingupComponent
	],
	imports: [
		FormsModule,
		SharedModule,
		AuthRoutingModule
	]
})
export class AuthModule {}