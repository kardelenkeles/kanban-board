import { Board } from '../../model/board';

export class AddBoard {
  static readonly type = '[Board] Add board';

  constructor(public payload: Board) {}
}

export class GetAllBoards {
  static readonly type = '[Board] Get All Boards';
}

export class DeleteBoard {
  static readonly type = '[Board] Delete Board';

  constructor(public id: number) {}
}

export class UpdateBoard {
  static readonly type = '[Board] Update Board';
  constructor(
    public id: number,
    public name: string,
    public description: string,
  ) {}
}

export class ChangeStatus {
  static readonly type = '[Board] Change status';

  constructor(
    public readonly boardItem: Board,
    public readonly status: boolean,
  ) {}
}
