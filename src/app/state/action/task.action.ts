import {Task} from "../../model/task";


export class AddTask {
  static readonly type = "[Task] Add task";

  constructor(
              public payload: Task
  ) {
  }
}

export class GetAllTasks {
  static readonly type = "[Board] Get All Tasks";
}

export class DeleteTask {
  static readonly type = "[Board] Delete Task";

  constructor(public id: number) {
  }
}

export class UpdateTask {
  static readonly type = "[Board] Update Task";

  constructor(public id: number,
              public header: string,
              public content: string,
              public label: string
  ) {
  }
}


export class ChangeStatus {
  static readonly type = "[Task] Change status";

  constructor(public readonly taskItem: Task,
              public readonly status: boolean) {
  }
}
