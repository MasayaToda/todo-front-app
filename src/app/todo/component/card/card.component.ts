import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Todo } from '../../../models/todo';

@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item:Todo = {
      id: 0,
      categoryId: 0,
      title: '',
      body: '',
      state: 0,
      createdAt: '',
      updatedAt: ''
  }
  constructor(private sanitizer: DomSanitizer) {}
  getBrEscape(text:string){
    return text.replace(/\\r\\n/g, '\r\n');
  }
}
