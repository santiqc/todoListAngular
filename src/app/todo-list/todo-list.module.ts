import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './component/todo-list.component';
import { TodoListService } from './service/todo-list.service';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  providers:[TodoListService]
})
export class TodoListModule { }
