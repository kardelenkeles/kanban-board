import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Board, UpdateBoard} from "../model/board";
import {Task, UpdateTask} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {}

  getTask(id: string){
    return this.http.get<Task[]>(`http://localhost:4200/api/tasks/${id}`);
  }
  getAllTasks(){
    return this.http.get<Task[]>(`http://localhost:4200/api/tasks`);
  }

  addTask(payload: Task){
    return this.http.post<Task>(`http://localhost:4200/api/tasks`, payload);
  }

  deleteTask(id:number){
    return this.http.delete<Task>(`http://localhost:4200/api/tasks/${id}`);
  }

  updateTask(id:number, formBody:UpdateTask){
    return this.http.put(`http://localhost:4200/api/tasks/${id}`, formBody);
  }


}
