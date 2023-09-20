import { TaskStateModel } from '../../model/taskStateModel';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  AddTask,
  DeleteTask,
  GetAllTasks,
  UpdateTask,
} from '../action/task.action';
import { Task } from '../../model/task';
import { tap } from 'rxjs';
import { TaskService } from '../../service/task.service';

@State<TaskStateModel>({
  name: 'task',
  defaults: {
    duties: [],
  },
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) {}

  @Action(AddTask)
  addTask(
    { getState, patchState }: StateContext<TaskStateModel>,
    { payload }: AddTask,
  ) {
    return this.taskService.addTask(payload).pipe(
      tap((result: any) => {
        const state = getState();
        patchState({
          duties: [...state.duties, result],
        });
      }),
    );
  }

  @Action(GetAllTasks)
  getAllTasks({ patchState }: StateContext<TaskStateModel>) {
    return this.taskService.getAllTasks().pipe(
      tap((result: any) => {
        patchState({
          duties: result,
        });
      }),
    );
  }

  @Action(DeleteTask)
  deleteTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { id }: DeleteTask,
  ) {
    return this.taskService.deleteTask(id).pipe(
      tap((res: Task) => {
        const state = getState();
        const filteredTasks = state.duties.filter((task) => task.id !== id);
        setState({
          ...state,
          duties: filteredTasks,
        });
      }),
    );
  }

  @Action(UpdateTask)
  updateTask({}: StateContext<TaskStateModel>, action: UpdateTask) {
    return this.taskService.updateTask(action.id, action.payload);
  }
}
