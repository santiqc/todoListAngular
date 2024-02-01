import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/component/todo-list.component';

const routes: Routes = [
  {path: "home", component: TodoListComponent,},
  {path: "**", component: TodoListComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
