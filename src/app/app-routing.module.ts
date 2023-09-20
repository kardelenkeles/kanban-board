import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { KanbanComponent } from './kanban/kanban.component';

const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'boards/:id', component: KanbanComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
