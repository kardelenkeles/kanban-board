import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Select, Store} from '@ngxs/store';
import {
  AddTask,
  DeleteTask,
  GetAllTasks,
  UpdateTask,
} from '../state/action/task.action';
import {TaskSelector} from '../state/selector/task.selector';
import {Observable} from 'rxjs';
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  @Select(TaskSelector.items)
  allTasks$: Observable<Task[]>;

  editedItemId: number | null = null;
  editedItem: number | null = null;

  allTasks: any = {
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  };

  newId: number;
  newHeader: string;
  newContent: string;
  newLabel: string = "";

  columns = ['backlog', 'todo', 'inProgress', 'done'];

  constructor(private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(GetAllTasks);

    this.allTasks$.subscribe((data) => {
      this.allTasks = {
        backlog: [],
        todo: [],
        inProgress: [],
        done: [],
      };
      data.forEach((item) => {
        if (!this.allTasks[item.status]) {
          this.allTasks[item.status] = [];
        }
        return this.allTasks[item.status].push(item);
      });
      this.columns = Object.keys(this.allTasks);
    });

  }


  addTask() {
    this.store.dispatch(
      new AddTask({
        header: this.newHeader,
        content: this.newContent,
        id: this.newId,
        label: this.newLabel,
        status: 'backlog',
      }),
    );
    this.newHeader = '';
    this.newContent = '';
    this.newLabel = '';
  }

  updateTask(id: number, item: any) {
    this.store.dispatch(new UpdateTask(id, {
      header: this.newHeader,
      content: this.newContent
    }));
    this.newHeader = '';
    this.newContent = '';

  }

  updateLabel(id: number, item: any) {
    const updatedLabel = `${item.label}, ${this.newLabel}`.trim();
    this.store.dispatch(new UpdateTask(id, {
      label: updatedLabel
    }))
      .subscribe(() => {
        this.store.dispatch(new GetAllTasks());
      });
    this.newLabel = '';
  }


  deleteLabel(item: any, labelToDelete: string) {
    const updatedLabels = item.label.split(',').map((label: string) => label.trim()).filter((label: string) => label !== labelToDelete);
    const updatedLabel = updatedLabels.join(', ');
    this.store.dispatch(new UpdateTask(item.id, {
      label: updatedLabel
    }))
      .subscribe(() => {
        this.store.dispatch(new GetAllTasks());
      });
  }

  parseLabels(value: string) {
    return value?.split(',').map((part) => part.trim());
  }

  startEditing(id: number) {
    if (this.editedItemId === id) {
      this.cancelEdit();
    } else {
      this.editedItemId = id;
    }
  }

  openLabelInput(id: number) {
    if (this.editedItem === id) {
      this.cancelEdit();
    } else {
      this.editedItem = id;
    }
  }

  cancelEdit() {
    this.editedItemId = null;
    this.store.dispatch(GetAllTasks);
  }

  deleteTask(id: number) {
    if (confirm('Do you want to delete this task?')) {
      this.store.dispatch(new DeleteTask(id));
    }
  }


  drop(event: CdkDragDrop<Task[]>, taskStatus: string) {
    const item = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateTask(item.id, {
        status: taskStatus,
      });
    }
  }


}
