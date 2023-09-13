import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {}


  // retrieveAllTodos(username: string) {
  //   return this.http.get<Todo[]>(`http://localhost:8080/users/${username}/todos`)
  // }
  //
  // deleteTodo(username: string, id: number) {
  //   return this.http.delete(`http://localhost:8080/users/${username}/todos/${id}`);
  // }
  //
  // retrieveTodo(username: string, id: number) {
  //   return this.http.get<Todo>(`http://localhost:8080/users/${username}/todos/${id}`);
  // }
  //
  // updateTodo(username: string, id: number, todo: Object) {
  //   return this.http.put(`http://localhost:8080/users/${username}/todos/${id}`, todo);
  // }
  //
  // createTodo(username: string, todo: Object) {
  //   return this.http.post(`http://localhost:8080/users/${username}/todos`, todo);
  // }
}
