import {Component, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AddTask} from "../ngxs/action/task.action";
import {TaskSelector} from "../ngxs/selector/task.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit{
  @Select(TaskSelector.items)
  items$: Observable<Task[]>;

  backlog: Task  [] = [];
  todo: Task  [] = [];
  inProgress: Task  [] = [];
  done: Task  [] = [];

  newHeader:string;
  newContent:string;

  constructor(private store: Store,
              private router: Router) {
  }

  ngOnInit(): void {
        this.items$
          .subscribe(data => this.backlog = data)
    }


  addTask() {
    this.store.dispatch(new AddTask(this.newHeader, this.newContent));
    this.newHeader = "";
    this.newContent = "";
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
