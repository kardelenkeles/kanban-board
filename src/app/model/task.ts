export interface Task {
  id:number;
  header: string;
  content: string;
  label: string;
}

export interface UpdateTask {
  header: string;
  content: string;
  label: string;
}
