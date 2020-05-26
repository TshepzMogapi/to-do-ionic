import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  public async getTodos(): Promise<Todo[]>{
    return [];
  }
}
