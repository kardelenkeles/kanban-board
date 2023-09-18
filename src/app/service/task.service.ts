import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Board, UpdateBoard} from "../model/board";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {}

  getTask(id: string){
    return this.http.get<Board[]>(`http://localhost:4200/api/boards/${id}`);
  }
  getAllTasks(){
    return this.http.get<Board[]>(`http://localhost:4200/api/boards`);
  }

  addTask(payload: Board){
    return this.http.post<Board>(`http://localhost:4200/api/boards`, payload);
  }

  deleteTask(id:number){
    return this.http.delete<Board>(`http://localhost:4200/api/boards/${id}`);
  }

  updateTask(id:number, formBody:UpdateBoard){
    return this.http.put(`http://localhost:4200/api/boards/${id}`, formBody);
  }


}
