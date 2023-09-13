import {Task} from "../../model/task";


export class AddTask {
  static readonly type = "[Task] Add task";

  constructor(public header: string,
              public content: string
              ) {
  }
}

export class ChangeStatus {
  static readonly type = "[Task] Change status";

  constructor(public readonly taskItem: Task,
              public readonly status: boolean) {
  }
}
