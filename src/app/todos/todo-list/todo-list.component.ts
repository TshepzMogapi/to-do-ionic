import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { TodoDetailComponent } from 'src/app/todo-detail/todo-detail.component';
import { TodoService } from 'src/app/api/todo.service';
import { Todo, Status } from 'src/app/models/todo';
import { formatDate} from '@angular/common';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  columnDefs = [
    { headerName: "Title", field: "title", rowDrag: true, resizable: true ,flex:2},
    { headerName: "Description", field: "description", rowDrag: true , resizable: true, flex:3},
    { headerName: "Status", field: "status", rowDrag: true, valueFormatter: this.statusFormatter, resizable: true , width:150},
    { headerName: "Due Date", field: "dueDate", rowDrag: true,valueFormatter: this.dueDateFormatter ,resizable: true,width:250},
  ];

  rowData = [
    // { title: "Add Service", status: "new", dueDate: 35000 },
    // { title: "Install Dependencies", status: "in progress", dueDate: 32000 },
    // { title: "Serve app", status: "blocked", dueDate: 72000 },
  ];

  statuses = Object.keys(Status).slice(Object.keys(Status).length / 2);


  constructor(public modalController: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private todoService: TodoService) {}

  ngOnInit() {
    this.fetchRemoteData();
  }

  fetchRemoteData() {
    this.presentLoading();
  }

  createTodo() {
    this.presentModal();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
      // duration: 2000
    }).then((resLoad) => {
      resLoad.present();


      this.todoService.getTodos().subscribe(res => {
        this.rowData = res;
        resLoad.dismiss(); 
      });

      resLoad.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });;

  }

  async presentModal(data?) {
    const modal = await this.modalController.create({
      component: TodoDetailComponent,
      componentProps: { 
        data: data,
        todos: this.rowData
      },
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then(data => {

      if(data.role == 'cancel' || data.role == 'backdrop') {
        this.doNothing();
      } else {
        this.fetchRemoteData();
        this.presentToast(data.role);

      }
  });
    return await modal.present();
  }

  doNothing(){}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: `To do ${message}`,
      duration: 2000
    });
    toast.present();
  }

  onRowClicked(event: any) { 
    this.presentModal(event.data);
  }

  statusFormatter(params) {
    return Object.keys(Status).slice(Object.keys(Status).length / 2)[params.value];
  }

  dueDateFormatter(params) {
    return formatDate(params.value, 'yyyy-MM-dd HH:mm', 'en-US');
  }
}
