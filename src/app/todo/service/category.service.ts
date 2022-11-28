import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable, of } from 'rxjs';
import { Category } from '../../models/category';
import { Message } from '../../models/message';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private Url = 'http://localhost:9000/api/category'

  httpOptions = {
  }

  constructor(private http: HttpClient) { }

  listCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.Url)
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.Url}/${id}`
    return this.http.get<Category>(url)
  }

  addCategory(Category: Category): Observable<Message> {
    const newCategory: Category = {
      id:    Category.id,
      name: Category.name,
      slug: Category.slug,
      color: Category.color,
    }
    return this.http.post<Message>(this.Url, newCategory, this.httpOptions)

  }

  editCategory(id:number, Category: Category): Observable<Message> {
    const url = `${this.Url}/${id}`
    const editCategory: Category = {
      id:    Category.id,
      name: Category.name,
      slug: Category.slug,
      color: Category.color,
    }
    return this.http.put<Message>(url, editCategory, this.httpOptions)
  }

  deleteCategory(id: number): Observable<Message> {
    const url = `${this.Url}/${id}`
    return this.http.delete<Message>(url, this.httpOptions)
  }
}