import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {
	loaderShow = new EventEmitter<boolean>();

  constructor() { }

  handleLoader(loaderVisible: boolean){
  	this.loaderShow.emit(loaderVisible);
  }

}
