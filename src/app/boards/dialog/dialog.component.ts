import { Component, Inject, OnInit } from '@angular/core';
import { UpdateBoard } from '../../state/action/board.action';
import { Store } from '@ngxs/store';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  newName: string;
  newDescription: string;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  updateBoard() {
    this.store.dispatch(
      new UpdateBoard(this.data.board.id, this.newName, this.newDescription),
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    this.newName = this.data.name;
    this.newDescription = this.data.description;
  }
}
