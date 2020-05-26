import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { TodoDetailComponent } from 'src/app/todo-detail/todo-detail.component';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  columnDefs = [
    { headerName: "Title", field: "title" },
    { headerName: "Status", field: "status" },
    { headerName: "Due Date", field: "dueDate" },
  ];

  rowData = [
    { title: "Add Service", status: "new", dueDate: 35000 },
    { title: "Install Dependencies", status: "in progress", dueDate: 32000 },
    { title: "Serve app", status: "blocked", dueDate: 72000 },
  ];

  constructor(public modalController: ModalController) {}

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
