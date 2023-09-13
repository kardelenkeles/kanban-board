import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {BoardStateModel} from "../../model/boardStateModel";
import {AddBoard} from "../action/board.action";
import {Board} from "../../model/board";
import { v4 as uuidv4 } from 'uuid';
import {tap} from "rxjs";
import {BoardService} from "../../service/board.service";

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
        return this.boardService.addBoard(payload).pipe(tap((result: any ) => {
          const state = getState();
          patchState({
            items: [...state.items, payload]
          });
        }));
    }

}
