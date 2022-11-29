import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable, of } from 'rxjs';
import { Todo } from '../models/todo';
import { Message } from '../models/message';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private Url = 'http://localhost:9000/api/todo'

  httpOptions = {
  }

  constructor(private http: HttpClient) { }

  listTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.Url)
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.Url}/${id}`
    return this.http.get<Todo>(url)
  }

  addTodo(Todo: Todo): Observable<Message> {
    const newTodo: Todo = {
      id:    Todo.id,
      categoryId: Todo.categoryId,
      title: Todo.title,
      body: Todo.body,
      state: Todo.state,
    }
    return this.http.post<Message>(this.Url, newTodo, this.httpOptions)

  }

  editTodo(id:number, Todo: Todo): Observable<Message> {
    const url = `${this.Url}/${id}`
    const editTodo: Todo = {
        id:    Todo.id,
        categoryId: Todo.categoryId,
        title: Todo.title,
        body: Todo.body,
        state: Todo.state,
    }
    return this.http.put<Message>(url, editTodo, this.httpOptions)
  }

  deleteTodo(id: number): Observable<Message> {
    const url = `${this.Url}/${id}`
    return this.http.delete<Message>(url, this.httpOptions)
  }
}