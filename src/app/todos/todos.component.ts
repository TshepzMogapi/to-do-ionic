import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  createTodo() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TodoDetailComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
