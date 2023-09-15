import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {BoardStateModel} from "../../model/boardStateModel";
import {AddBoard, DeleteBoard, GetAllBoards, UpdateBoard} from "../action/board.action";
import {Board} from "../../model/board";
import {v4 as uuidv4} from 'uuid';
import {tap} from "rxjs";
import {BoardService} from "../../service/board.service";
import {patch, removeItem} from "@ngxs/store/operators";

@State<BoardStateModel>({
    name: "board",
    defaults: {
        items: [],
    },
})
@Injectable()
export class BoardState {

    constructor(private boardService: BoardService) {
    }

    @Action(AddBoard)
    // addBoard(ctx: StateContext<BoardStateModel>, action: AddBoard) {
    //     const state = ctx.getState();
    //     const newItem: Board = {
    //         id: action.id,
    //         name: action.name,
    //         description: action.description
    //     };
    //
    //     ctx.setState({
    //         ...state,
    //         items: [...state.items, newItem],
    //     });

    addBoard({getState, patchState}: StateContext<BoardStateModel>, {payload}: AddBoard) {
        return this.boardService.addBoard(payload).pipe(tap((result: any) => {
            const state = getState();
            patchState({
                items: [...state.items, result]
            });
        }));
    }

    @Action(GetAllBoards)
    getAllBoards({getState, patchState}: StateContext<BoardStateModel>) {
        return this.boardService.getAllBoards()
            .pipe(tap((result: any) => {
                const state = getState();
                patchState({
                    items: result
                });
            }));
    }

    @Action(DeleteBoard)
    deleteBoard({getState, setState}: StateContext<BoardStateModel>, {id}: DeleteBoard) {
        return this.boardService.deleteBoard(id)
            .pipe(tap((res: Board) => {
                const state = getState();
                const filteredBoards = state.items.filter(board => board.id !== id);
                setState({
                    ...state,
                    items: filteredBoards
                })
            }))
    }

    @Action(UpdateBoard)
    // updateBoard(ctx: StateContext<BoardStateModel>, action: UpdateBoard) {
    //   const state = ctx.getState();
    //   const updatedBoards = state.items.map((board) => {
    //     // board.id === id ? {...board}: board
    //     if (board.id === action.board.id) {
    //       return action.board;
    //     }
    //     return board;
    //   });
    //   ctx.setState({...state, items: updatedBoards});
    // }

    updateBoard({getState, setState}: StateContext<BoardStateModel>, action: UpdateBoard) {
        console.log(action.id)
        const formBody = {name: action.name, description: action.description}
        return this.boardService.updateBoard(action.id, formBody)

    }
}
