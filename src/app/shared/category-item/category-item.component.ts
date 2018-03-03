import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
	@Input("cItem") categoryItem: string;
	@Output("cCreated") categoryCreated = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addCategory(){
  	this.categoryCreated.emit(this.categoryItem);
  }

}
