import {Component, Inject, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {UpdateBoard} from "../../state/action/board.action";
import {Store} from "@ngxs/store";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    newName: string;
    newDescription: string;

    constructor(private store: Store,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    updateBoard(board: Board) {
        this.store.dispatch(new UpdateBoard(board.id, board.name, board.description));
    }

    ngOnInit(): void {
        console.log(this.data)
        this.newName = this.data.name;
        this.newDescription = this.data.description;
    }

}
