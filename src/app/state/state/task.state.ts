import {TaskStateModel} from "../../model/taskStateModel";
import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import {Board} from "../../model/board";
import {AddTask, DeleteTask, GetAllTasks, UpdateTask} from "../action/task.action";
import {Task} from "../../model/task";
import {BoardStateModel} from "../../model/boardStateModel";
import {AddBoard, DeleteBoard, GetAllBoards, UpdateBoard} from "../action/board.action";
import {tap} from "rxjs";
import {BoardService} from "../../service/board.service";
import {TaskService} from "../../service/task.service";

@State<TaskStateModel>({
  name: "task",
  defaults: {
    duties: [],
  },
})

@Injectable()
export class TaskState {

  constructor(private taskService: TaskService) {
  }

  @Action(AddTask)
  addTask({getState, patchState}: StateContext<TaskStateModel>, {payload}: AddTask) {
    return this.taskService.addTask(payload).pipe(tap((result: any) => {
      const state = getState();
      patchState({
        duties: [...state.duties, result]
      });
    }));
  }

  @Action(GetAllTasks)
  getAllTasks({getState, patchState}: StateContext<TaskStateModel>) {
    return this.taskService.getAllTasks()
      .pipe(tap((result: any) => {
        const state = getState();
        patchState({
          duties: result
        });
      }));
  }

  @Action(DeleteTask)
  deleteTask({getState, setState}: StateContext<TaskStateModel>, {id}: DeleteTask) {
    return this.taskService.deleteTask(id)
      .pipe(tap((res: Task) => {
        const state = getState();
        const filteredTasks = state.duties.filter(task => task.id !== id);
        setState({
          ...state,
          duties: filteredTasks
        })
      }))
  }

  @Action(UpdateTask)
  updateTask({}: StateContext<TaskStateModel>, action: UpdateTask) {
    const formBody = {header: action.header, content: action.content, label: action.label}
    return this.taskService.updateTask(action.id, formBody);
  }


}
