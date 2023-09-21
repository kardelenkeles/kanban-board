import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {BoardStateModel} from '../../model/boardStateModel';
import {
    AddBoard,
    DeleteBoard,
    GetAllBoards,
    UpdateBoard,
} from '../action/board.action';
import {Board} from '../../model/board';
import {v4 as uuidv4} from 'uuid';
import {tap} from 'rxjs';
import {BoardService} from '../../service/board.service';
import {patch, removeItem} from '@ngxs/store/operators';

@State<BoardStateModel>({
    name: 'board',
    defaults: {
        items: [],
    },
})
@Injectable()
export class BoardState {
    constructor(private boardService: BoardService) {
    }

    @Action(AddBoard)
    addBoard(
        {getState, patchState}: StateContext<BoardStateModel>,
        {payload}: AddBoard,
    ) {
        return this.boardService.addBoard(payload).pipe(
            tap((result: any) => {
                const state = getState();
                patchState({
                    items: [...state.items, result],
                });
            }),
        );
    }

    @Action(GetAllBoards)
    getAllBoards({getState, patchState}: StateContext<BoardStateModel>) {
        return this.boardService.getAllBoards().pipe(
            tap((result: any) => {
                const state = getState();
                patchState({
                    items: result,
                });
            }),
        );
    }

    @Action(DeleteBoard)
    deleteBoard(
        {getState, setState}: StateContext<BoardStateModel>,
        {id}: DeleteBoard,
    ) {
        return this.boardService.deleteBoard(id).pipe(
            tap((res: Board) => {
                const state = getState();
                const filteredBoards = state.items.filter((board) => board.id !== id);
                setState({
                    ...state,
                    items: filteredBoards,
                });
            }),
        );
    }

    @Action(UpdateBoard)
    updateBoard({}: StateContext<BoardStateModel>, action: UpdateBoard) {
        const formBody = {name: action.name, description: action.description};
        return this.boardService.updateBoard(action.id, formBody);
    }
}
