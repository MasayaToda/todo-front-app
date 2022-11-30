import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable, of } from 'rxjs';
import { Color } from '../models/color';
import { Message } from '../models/message';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private Url = 'http://localhost:9000/api/category-color'

  httpOptions = {
  }

  constructor(private http: HttpClient) { }

  listColor(): Observable<Color[]> {
    return this.http.get<Color[]>(this.Url)
  }
}