import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  todoForm: FormGroup;
  categories: any;
  constructor() {
    this.todoForm = new FormGroup({
      title:    new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }
}
