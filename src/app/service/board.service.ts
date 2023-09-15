import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BoardsComponent} from "../boards/boards.component";
import {Board} from "../model/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient
  ) {}

  getBoard(id: string){
    return this.http.get<Board[]>(`http://localhost:4200/api/boards/${id}`);
  }
  getAllBoards(){
    return this.http.get<Board[]>(`http://localhost:4200/api/boards`);
  }

  addBoard(payload: Board){
    return this.http.post<Board>(`http://localhost:4200/api/boards`, payload);
  }

  deleteBoard(id:number){
    return this.http.delete<Board>(`http://localhost:4200/api/boards/${id}`);
  }

  updateBoard(id:number, formBody: any){
    return this.http.put(`http://localhost:4200/api/boards/${id}`, formBody);
  }


}
