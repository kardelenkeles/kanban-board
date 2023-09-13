import {TaskStateModel} from "../../model/taskStateModel";
import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import {Board} from "../../model/board";
import {AddTask} from "../action/task.action";
import {Task} from "../../model/task";

@State<TaskStateModel>({
  name: "task",
  defaults: {
    duties: [],
  },
})

@Injectable()
export class TaskState {
  @Action(AddTask)
  addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
    const state = ctx.getState();
    console.log(action)
    const newDuty: Task = {
      header: action.header,
      content: action.content
    };

    ctx.setState({
      ...state,
      duties: [...state.duties, newDuty],
    });
  }



}
