import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {BoardStateModel} from "../../model/boardStateModel";
import {AddBoard} from "../action/board.action";
import {Board} from "../../model/board";
import { v4 as uuidv4 } from 'uuid';

@State<BoardStateModel>({
    name: "board",
    defaults: {
        items: [],
    },
})
@Injectable()
export class BoardState {
    @Action(AddBoard)
    addBoard(ctx: StateContext<BoardStateModel>, action: AddBoard) {
        const state = ctx.getState();
        console.log(action)
        const newItem: Board = {
            id: action.id,
            name: action.name,
            description: action.description
        };

        ctx.setState({
            ...state,
            items: [...state.items, newItem],
        });
    }

}
