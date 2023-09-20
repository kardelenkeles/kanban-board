import { Task } from '../../model/task';

export class AddTask {
  static readonly type = '[Task] Add task';

  constructor(public payload: Task) {}
}

export class GetAllTasks {
  static readonly type = '[Task] Get All Tasks';
}

export class DeleteTask {
  static readonly type = '[Task] Delete Task';

  constructor(public id: number) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update Task';

  constructor(
    public id: number,
    public payload: {
      header: string;
      content: string;
      label: string;
      status: string;
    },
  ) {}
}

export class ChangeStatus {
  static readonly type = '[Task] Change status';

  constructor(
    public readonly taskItem: Task,
    public readonly status: boolean,
  ) {}
}
