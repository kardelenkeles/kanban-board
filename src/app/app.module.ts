import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardsComponent} from './boards/boards.component';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {KanbanComponent} from './kanban/kanban.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {BoardState} from "./state/state/board.state";
import {CommonModule} from "@angular/common";
import {TaskState} from "./state/state/task.state";
import {HttpClientModule} from "@angular/common/http";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './boards/dialog/dialog.component';
import { TasksComponent } from './kanban/tasks/tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    KanbanComponent,
    DialogComponent,
    TasksComponent,

  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    BrowserAnimationsModule,
    CdkDropList,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([BoardState, TaskState]),
    FormsModule,
    CommonModule,
    CdkDrag,
    CdkDropListGroup,
    HttpClientModule,
    NgxsLoggerPluginModule.forRoot(),
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
