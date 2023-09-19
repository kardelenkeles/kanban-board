import {Component, OnInit} from '@angular/core';
import {Task, TaskStatus} from "../model/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Select, Store} from "@ngxs/store";
import {AddTask, DeleteTask, GetAllTasks, UpdateTask} from "../state/action/task.action";
import {TaskSelector} from "../state/selector/task.selector";
import {Observable} from "rxjs";
import {TaskService} from "../service/task.service";
import {TaskState} from "../state/state/task.state";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @Select(TaskSelector.items)
  allTasks$: Observable<Task[]>;
  editedItemId: number | null = null;

  allTasks: any = {
    backlog: [],
    todo: [],
    inProgress: [],
    done: []
  }

  newId: number;
  newHeader: string;
  newContent: string;
  newLabel: string;

  columns = [
    'backlog',
    'todo',
    'inProgress',
    'done'
  ];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(GetAllTasks)

    this.allTasks$
      .subscribe(data => {
        this.allTasks= {
          backlog: [],
          todo: [],
          inProgress: [],
          done: []
        }
        data.forEach(item => {
          if (!this.allTasks[item.status]) {
            this.allTasks[item.status] = [];
          }
          return this.allTasks[item.status].push(item);
        });
        this.columns = Object.keys(this.allTasks);
      });
  }


  addTask() {
    this.store.dispatch(new AddTask({
      header: this.newHeader,
      content: this.newContent,
      id: this.newId,
      label: this.newLabel,
      status: 'backlog'
    }));
    this.newHeader = "";
    this.newContent = "";
    this.newLabel = "";
  }

  updateTask(id: number, item: any) {
    this.store.dispatch(new UpdateTask(id, item));
  }

  startEditing(id: number) {
    if (this.editedItemId === id) {
      this.cancelEdit();
    } else {
      this.editedItemId = id;
    }
  }

  cancelEdit() {
    this.editedItemId = null;
  }

  deleteTask(id: number) {
    if (confirm('Do you want to delete this task?')) {
      this.store.dispatch(new DeleteTask(id));
    }
  }

  drop(event: CdkDragDrop<Task[]>, taskStatus: string) {
    const item = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateTask(item.id, {
        status: taskStatus
      })
    }
  }


}
