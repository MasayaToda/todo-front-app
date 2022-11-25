import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent {
  @Output() appMessageComponent = new EventEmitter<string>();
  constructor(
    
    ){

    }
}
