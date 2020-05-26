export class Todo {
    title: string;
    description: string;
    status: Status;
    dueDate: Date;
}

enum Status {
    New = 1,
    InProgress,
    Blocked,
    Completed
  }
