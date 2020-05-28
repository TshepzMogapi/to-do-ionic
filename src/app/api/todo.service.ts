import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // apiUrl = "https://my-json-server.typicode.com/tshepzmogapi/to-do-ionic/todos";
  apiUrl = "http://localhost:3000/todos";

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }

  public createTodo(toDo: Todo): Observable<Todo>{
    return this.http.post<Todo>(`${this.apiUrl}`, toDo);
  }

  public updateTodo(toDoId: number, toDo: Todo): Observable<Todo>{
    return this.http.put<Todo>(`${this.apiUrl}/${toDoId}`, toDo);
  }

  public deleteTodo(toDoId: number): Observable<Todo>{
    return this.http.delete<Todo>(`${this.apiUrl}/${toDoId}`);
  }
}
