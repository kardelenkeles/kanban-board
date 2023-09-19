import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Board} from "../model/board";
import {Select, Store} from "@ngxs/store";
import {AddBoard, DeleteBoard, GetAllBoards, UpdateBoard} from "../state/action/board.action";
import {BoardSelectors} from "../state/selector/board.selector";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {BoardService} from "../service/board.service";
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

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


    constructor(private store: Store,
                private router: Router,
                private dialog: MatDialog
    ) {
    }

    addBoard() {

        this.store.dispatch(new AddBoard({
            name: this.newName,
            description: this.newDescription,
            id: this.newId

        }));
        this.newName = '';
        this.newDescription = '';
    }

    deleteBoard(id: number) {
        if (confirm('Do you want to delete this board?')) {
            this.store.dispatch(new DeleteBoard(id));
        }
    }

    ngOnInit(): void {

        this.store.dispatch(new GetAllBoards());
        this.items$
            .subscribe(data => this.boards = data);

    }

    navigateKanban(id: number) {
        this.router
            .navigate([
                '/boards',
                id
            ]).then();
    }

    public openDialog(board: any) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: "1000px",
            data: {
                board
            }
        });
    }

}

