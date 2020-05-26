import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TodosComponent } from '../todos/todos.component';
import { TodoListComponent } from '../todos/todo-list/todo-list.component';

import { AgGridModule } from 'ag-grid-angular';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [HomePage, TodosComponent, TodoListComponent]
})
export class HomePageModule {}
