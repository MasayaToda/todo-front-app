import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { 
    path: 'todo', 
    component: TodoListComponent,
    data: { animation: 'Page2' }
  },
  { 
    path: 'todo/add', 
    component: TodoAddComponent,
    data: { animation: 'Page3' }
  },
  { 
    path: 'todo/show/:id', 
    component: TodoEditComponent,
    data: { animation: 'Page3' }
  },
  { 
    path: 'category', 
    component: CategoryListComponent,
    data: { animation: 'Page2' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
