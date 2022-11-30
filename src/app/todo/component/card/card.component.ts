import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Todo } from '../../../models/todo';
import { Status } from '../../../models/status';
import { Utils } from '../../../common/util/util';
@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class TodoCardComponent {
  @Input() item:Todo = {
      id: 0,
      categoryId: 0,
      title: '',
      body: '',
      state: 0,
      createdAt: '',
      updatedAt: ''
  }
  @Input() status:Status[] = []
  todoStatusColorClassList:any ={
    1:"card-chip-color-todo",
    2:"card-chip-color-progress",
    3:"card-chip-color-complete"
  }
  categoryColorClassList:any ={
    "info":"category-color-RED",
    "warn":"category-color-YELLO",
    "danger":"category-color-BLUE"
  }
  constructor(private sanitizer: DomSanitizer,protected util: Utils) {}
  getBrEscape(text:string){
    return text.replace(/\\r\\n/g, '\r\n');
  }
  getStatusName(state:Number){
    let findStatus = this.status.find((code)=>{return state === code.code})
    if(typeof findStatus === 'undefined'){
      return "未設定"
    }else{
      return findStatus.name
    }
  }
  getLocalTime(timeStr?:string){
    if(typeof timeStr === 'string'){
      let date = new Date(timeStr)
      return date.toLocaleDateString() +' '+ date.toLocaleTimeString()
    }else{
      return ''
    }
  }
  todoStatusColorClass(state:number){
    return this.todoStatusColorClassList[state]
  }
  cateoryColorClass(colorName?:string){
    if(typeof colorName === 'string'){
      return this.categoryColorClassList[colorName]
    }else{
      return 'card-chip-color-none'
    }
  }
}
