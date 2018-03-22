import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { ErrorService } from "../error/error.service";
import { Observable } from "rxjs";
import 'rxjs/Rx';
import {LoaderService} from '../loader/loader.service';
import {UserModel} from '../shared/user-model';
@Injectable()
export class OwnerStorageService {
	private contactUrl = "/api/owner";

  constructor(private httpService: Http,
  				private errorService: ErrorService,
  				private loaderService: LoaderService) { }

  //INDEX
  indexUsers(){
    this.loaderService.handleLoader(true);
    const token = localStorage.getItem("token");
    const headers = new Headers({'authorization': `bearer ${token}`});
  	return this.httpService.get(this.contactUrl, {headers: headers}).map((res:Response) => {
  		const users:UserModel[] = res.json();
  		this.loaderService.handleLoader(false);
  		return users;
  	})
  	.catch((error: Response) => {
      this.loaderService.handleLoader(false);
      this.errorService.handleError(error.json());
      return Observable.throw(error.json().message);
    });
  }

  //DELETE
  deleteUsers(index:string){
  	this.loaderService.handleLoader(true);
  	const token = localStorage.getItem("token");
  	const headers = new Headers({'authorization': `bearer ${token}`});
  	return this.httpService.delete(`${this.contactUrl}/${index}`, {headers: headers})
  		.map((res:Response) => {
  			this.loaderService.handleLoader(false);
  			const _id:string = res.json();
        console.log("Dentro del deleteUser del owner");
        console.log(_id);
  			return _id;
  		})
  		.catch((error: Response) => {
	      this.loaderService.handleLoader(false);
	      this.errorService.handleError(error.json());
	      return Observable.throw(error.json().message);
	    });
  }

  //UPDATE

}
