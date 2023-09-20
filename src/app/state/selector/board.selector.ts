import { Selector } from '@ngxs/store';
import { BoardState } from '../state/board.state';
import { BoardStateModel } from '../../model/boardStateModel';

export class BoardSelectors {
  @Selector([BoardState])
  static items(state: BoardStateModel) {
    return state.items;
  }
}
