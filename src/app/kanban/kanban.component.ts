import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AddTask} from "../state/action/task.action";
import {TaskSelector} from "../state/selector/task.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @Select(TaskSelector.items)
  items$: Observable<Task[]>;

  isEditing = false;
  editedTask: string | null = null;

  backlog: Task  [] = [];
  todo: Task  [] = [];
  inProgress: Task  [] = [];
  done: Task  [] = [];

  newHeader: string;
  newContent: string;
  newLabel: string;
  constructor(private store: Store) {
  }

  ngOnInit(): void {

    this.items$
      .subscribe(data => this.backlog = data)
  }


  addTask() {
    this.isEditing = false;
    this.store.dispatch(new AddTask(this.newHeader, this.newContent));
    this.newHeader = "";
    this.newContent = "";
    this.editedTask = null;
  }

  startEditing(){
    if (!this.isEditing) {
      this.isEditing = true;
      this.editedTask = this.newLabel; // Store the current content
    }
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
