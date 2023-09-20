export interface Task {
  id: number;
  header: string;
  content: string;
  label: string;
  status: string;
}

export interface UpdateTask {
  header?: string;
  content?: string;
  label?: string;
  status?: string;
}

export enum TaskStatus {
  BACKLOG = 'backlog',
  TODO = 'todo',
  INPROGRESS = 'inProgress',
  DONE = 'done',
}


