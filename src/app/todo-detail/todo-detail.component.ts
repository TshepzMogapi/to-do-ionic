import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../api/todo.service';
import { Todo, Status } from '../models/todo';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {

  todoForm: FormGroup;

  data;
  todos;

  dependencies = [];

  statusEnum = Status;

  isNew: boolean;

  

  statuses = Object.keys(Status).slice(Object.keys(Status).length / 2);

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private todoService: TodoService) { }

  ngOnInit() {

    this.todos = this.data? this.todos.filter(td => td.id != this.data.id): this.todos;

    if(this.data) {
      this.todos.forEach(td => {

        if(td.blockers) {
          if(td.blockers.indexOf(this.data.id + '') > -1) {
            this.dependencies.push(td);
          }
        }
      });
    }

    this.isNew = !this.data ?  true : false;
    this.todoForm = this.fb.group({
      title: [this.data ? this.data.title : '', Validators.required],
      description: [this.data ? this.data.description : '', Validators.required],
      status: [this.data ? this.data.status : Status[1], Validators.required],
      blockers: [this.data ? this.data.blockers : []],
      dueDate: [this.data ? this.data.dueDate : '', Validators.required],
    });
  }

  createToDo() {

    const todo = this.getFormValues();

    this.modalController.dismiss(todo, 'created successfully!');

    this.todoService.createTodo(todo).subscribe(res => {
      console.log(res);
    });

  }

  updateToDo() {
    const todo = this.getFormValues();

    this.todoService.updateTodo(this.data.id, todo).subscribe(res => {
      // this.presentLoading();

      if(res) {
        this.modalController.dismiss(todo, 'updated successfully!');
      } else {
        this.modalController.dismiss(todo, 'failed to update!');
      }
    });
    

  }

  getFormValues() {
    const todo = new Todo();
    // todo
    todo.title = this.todoForm.value.title;
    todo.description = this.todoForm.value.description;
    todo.dueDate = this.todoForm.value.dueDate;
    todo.blockers = this.todoForm.value.blockers;

    todo.status = this.todoForm.value.status;

    return todo;
  }

  deleteToDo() {

    this.presentAlertConfirm();

  }

  close() {
    this.modalController.dismiss(null,'cancel');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
      // duration: 2000
    });
    await loading.present();

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Delete Todo.',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes, Delete',
          handler: () => {
            this.modalController.dismiss(this.data, 'deleted successfully!');

            this.todoService.deleteTodo(this.data.id).subscribe(res => {
            console.log('Confirm Delete');

            });

          
          }
        }
      ]
    });

    await alert.present();
  }

}
