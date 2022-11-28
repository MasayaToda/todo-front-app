import { Component, OnInit , Input} from '@angular/core';
import { TodoService } from '../service/todo.service';
import { StatusService } from '../service/status.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  todoList:any = []
  statusList:any = []
  constructor(private todoService: TodoService,private statusService: StatusService) {}
  ngOnInit(): void {
    this.getStatusList()
    this.getTodoList()
  }
  getStatusList() {
    return this.statusService.listStatus().subscribe((data)=>{
      this.statusList = data
    })
  }
  getTodoList() {
    return this.todoService.listTodo().subscribe((data)=>{
      this.todoList = data
    })
  }
}
