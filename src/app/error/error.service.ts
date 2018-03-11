import { Injectable, EventEmitter } from '@angular/core';
import { ErrorModel } from "./error-model";

@Injectable()
export class ErrorService {
	errorOccurred = new EventEmitter<ErrorModel>();

  constructor() { }

  handleError(error: any) {
  		console.log("En el error");
  		console.log(error);
        const errorData = new ErrorModel(error.message);
        this.errorOccurred.emit(errorData);
    }

}
