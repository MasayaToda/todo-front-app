import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
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
  { 
    path: 'category/add', 
    component: CategoryAddComponent,
    data: { animation: 'Page3' }
  },
  { 
    path: 'category/show/:id', 
    component: CategoryEditComponent,
    data: { animation: 'Page3' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
