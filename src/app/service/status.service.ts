import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable, of } from 'rxjs';
import { Status } from '../models/status';
import { Message } from '../models/message';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private Url = 'http://localhost:9000/api/todo-status'

  httpOptions = {
  }

  constructor(private http: HttpClient) { }

  listStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.Url)
  }
}