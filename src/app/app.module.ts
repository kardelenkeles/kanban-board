import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardsComponent} from './boards/boards.component';
import {CdkDropList} from "@angular/cdk/drag-drop";
import {KanbanComponent} from './kanban/kanban.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {BoardState} from "./ngxs/state/board.state";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations: [
        AppComponent,
        BoardsComponent,
        KanbanComponent
    ],
    imports: [
        BrowserModule,
        RouterOutlet,
        BrowserAnimationsModule,
        CdkDropList,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([BoardState]),
        FormsModule,
        CommonModule,


    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
