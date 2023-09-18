import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AddTask, DeleteTask, GetAllTasks, UpdateTask} from "../state/action/task.action";
import {TaskSelector} from "../state/selector/task.selector";
import {Observable} from "rxjs";
import {TaskService} from "../service/task.service";
import {animate} from "@angular/animations";
import {DeleteBoard} from "../state/action/board.action";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @Select(TaskSelector.items)
  items$: Observable<Task[]>;
  editedItemId: number;

  backlog: Task  [] = [];
  todo: Task  [] = [];
  inProgress: Task  [] = [];
  done: Task  [] = [];


  newId: number;
  newHeader: string;
  newContent: string;
  newLabel: string;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(GetAllTasks)

    this.items$
      .subscribe(data => this.backlog = data)



  }

  startEditing(id: number){
    this.editedItemId = id;
  }

  addTask() {
    this.store.dispatch(new AddTask({
      header: this.newHeader,
      content: this.newContent,
      id: this.newId,
      label: this.newLabel
    }));
    this.newHeader = "";
    this.newContent = "";
    this.newLabel = "";

  }

  updateTask(taskId: number, property:string, event:Event) {

    const task:any = this.backlog.find(item => item.id === taskId);

    if (task) {
      task[property] = (event.target as HTMLElement).innerText;

      this.store.dispatch(new UpdateTask(taskId, task.header, task.content, task.label));
      // this.newHeader = "";
      // this.newContent = "";
      // this.newLabel = "";
    }
  }
  deleteTask(id: number) {
    if (confirm('Do you want to delete this task?')) {
      this.store.dispatch(new DeleteTask(id));
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
