import {Selector} from "@ngxs/store";
import {BoardStateModel} from "../../model/boardStateModel";
import {TaskState} from "../state/task.state";
import {TaskStateModel} from "../../model/taskStateModel";

export class TaskSelector {
  @Selector([TaskState])
  static items(state: TaskStateModel) {
    return state.duties;
  }
}
