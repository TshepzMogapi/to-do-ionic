export class Todo {
    title: string;
    description: string;
    status: number;
    blockers: string;
    dueDate: Date;
}

export enum Status {
    New = 1,
    InProgress,
    Blocked,
    Completed
  }
