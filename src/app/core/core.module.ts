import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from '../app-routing.module';
import {DropdownDirective} from '../shared/dropdown.directive';
//como voy a usar rutas en el header, tengo que importar las rutas que usare
@NgModule({
	declarations: [
		ErrorComponent,
		HeaderComponent,
		HomeComponent,
		DropdownDirective
	],
	imports: [
		CommonModule,
		AppRoutingModule
	],
	exports: [
		AppRoutingModule,
		ErrorComponent,
		HeaderComponent
	]
})
export class CoreModule {}

//ARREGLAR EL AOT