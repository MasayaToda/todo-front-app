import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable, of } from 'rxjs';
import { Todo } from '../../models/todo';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private Url = 'http://localhost:9000/api/todo'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,"Csrf-Token" : "nocheck"})
  }

  constructor(private http: HttpClient) { }

  listTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.Url)
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.Url}/${id}`
    return this.http.get<Todo>(url)
  }

  addTodo(Todo: Todo): Observable<Todo> {
    const newTodo: Todo = {
      id:    Todo.id,
      categoryId: Todo.categoryId,
      title: Todo.title,
      body: Todo.body,
      state: Todo.state,
    }
    return this.http.post<Todo>(this.Url, newTodo, this.httpOptions)

  }

  editTodo(Todo: Todo): Observable<Todo> {
    const editTodo: Todo = {
        id:    Todo.id,
        categoryId: Todo.categoryId,
        title: Todo.title,
        body: Todo.body,
        state: Todo.state,
    }
    return this.http.put<Todo>(this.Url, editTodo, this.httpOptions)
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.Url}/${id}`
    return this.http.delete<Todo>(url, this.httpOptions)
  }
}