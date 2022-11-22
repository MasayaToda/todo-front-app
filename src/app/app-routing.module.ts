import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/add', component: TodoAddComponent },
  { path: 'todo/show/:id', component: TodoEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
