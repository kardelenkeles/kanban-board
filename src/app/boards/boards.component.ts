import {Component, OnInit} from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Board} from "../model/board";
import {v4 as uuidv4} from 'uuid';
import {Select, Store} from "@ngxs/store";
import {AddBoard} from "../state/action/board.action";
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
  newDescription: string;
  newId: number;
  boards: Board[] = [];
  // form: FormGroup = new FormGroup({
  //     Name: new FormControl(null, [Validators.required]),
  //     Description: new FormControl(null, [Validators.required]),
  // });

  constructor(private store: Store,
              private router: Router,
              private boardService: BoardService) {
  }

  findBoardById(id:string) {
    return this.boardService.getBoard(id);
  }



  //
  addBoard() {

    this.store.dispatch(new AddBoard({
      name: this.newName,
      description: this.newDescription,
      id: uuidv4()
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

  ngOnInit(): void {
    this.items$
      .subscribe(data => this.boards = data)
  }

  navigateKanban(id: string) {
    this.router
      .navigate([
        '/boards',
        id
      ]).then();
  }

}
