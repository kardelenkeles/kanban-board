import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {Observable} from "rxjs";
import {GetAllBoards, UpdateBoard} from "../../state/action/board.action";
import {Store} from "@ngxs/store";
import {BoardsComponent} from "../boards.component";
import {DialogRef} from "@angular/cdk/dialog";
import {Board} from "../../model/board";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    newName: string;
    newDescription: string;

    constructor(
        public dialog: MatDialog,
        public media: MediaObserver,
        private store: Store,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }


    updateBoard() {
        this.store.dispatch(new UpdateBoard(this.data.board.id, this.newName, this.newDescription));
        this.store.dispatch(new GetAllBoards());
    }

    ngOnInit(): void {
        console.log(this.data)
        this.newName = this.data.name;
        this.newDescription = this.data.description;
    }

}
