import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  @Output() appMessageComponent = new EventEmitter<string>();
  constructor(
    
    ){

    }
}
