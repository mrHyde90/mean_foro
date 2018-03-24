//MODULOS De ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//FEATURES MODULES
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';

//ROUTING MODULE
import {AppRoutingModule} from './app-routing.module';

//COMPONENTS
import { AppComponent } from './app.component';
//CORE COMPONENTS
import { ErrorPageComponent } from './error-page/error-page.component';
//USER COMPONENT
import { UserComponent } from './user/user.component';

//servicios
import {AuthService} from './auth/auth.service';
import {UserService} from './shared/user.service';
import {ErrorService} from './error/error.service';
import {LoaderService} from './loader/loader.service';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    SharedModule,
    AuthModule,
    CoreModule
  ],
  providers: [AuthService, UserService, ErrorService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
