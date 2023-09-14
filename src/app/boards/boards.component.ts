import {Component, OnInit} from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Board} from "../model/board";
import {Select, Store} from "@ngxs/store";
import {AddBoard, DeleteBoard, GetAllBoards} from "../state/action/board.action";
import {BoardSelectors} from "../state/selector/board.selector";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {BoardService} from "../service/board.service";


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  @Select(BoardSelectors.items)
  items$: Observable<Board[]>;

  newName: string;
  newId: number;
  newDescription: string;
  boards: Board[] = [];
  // form: FormGroup = new FormGroup({
  //     Name: new FormControl(null, [Validators.required]),
  //     Description: new FormControl(null, [Validators.required]),
  // });

  constructor(private store: Store,
              private router: Router,
              private boardService: BoardService) {
  }

  // findBoardById(id: string) {
  //   return this.boardService.getBoard(id);
  // }

  //
  addBoard() {

    this.store.dispatch(new AddBoard({
      name: this.newName,
      description: this.newDescription,
      id: this.newId
    }));

    // console.log(this.form.value);
    // this.boards.push({
    //     id: uuidv4(),
    //     name: this.form.value.Name,
    //     description: this.form.value.Description
    // })
    // // this.boards = [...this.boards,{
    // //         name: this.form.value.Name,
    // //         description: this.form.value.Description
    // //     } ];
    // console.log(this.boards);
  }

  deleteBoard(id: number) {
    if (confirm('Do you want to delete this board?')) {
      console.log(id);
      this.store.dispatch(new DeleteBoard(id));
    }
  }

  ngOnInit(): void {
    this.items$
      .subscribe(data => this.boards = data);

    this.store.dispatch(new GetAllBoards());
  }

  navigateKanban(id: number) {
    this.router
      .navigate([
        '/boards',
        id
      ]).then();
  }

}
