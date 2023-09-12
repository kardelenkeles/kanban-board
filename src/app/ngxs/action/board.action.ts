import {Board} from "../../model/board";

export class AddBoard {
    static readonly type = "[Board] Add board";

    constructor(public name: string,
                public description: string,
                public id: string) {
    }
}

export class ChangeStatus {
    static readonly type = "[Board] Change status";

    constructor(public readonly boardItem: Board,
                public readonly status: boolean) {
    }
}
