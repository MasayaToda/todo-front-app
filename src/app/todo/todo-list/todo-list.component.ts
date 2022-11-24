import { Component, OnInit , Input} from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  todoList:any = []
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.getTodoList()
  }
  getTodoList() {
    return this.todoService.listTodo().subscribe((data)=>{
      this.todoList = data
    })
  }
}
