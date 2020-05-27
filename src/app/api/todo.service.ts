import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = "https://my-json-server.typicode.com/tshepzmogapi/to-do-ionic/todos";

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }
}
