import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

const shared = [
  // components
  HeaderComponent,
  AddTaskComponent
];

@NgModule({
  declarations: shared,
  imports: [
    CommonModule
  ],
  exports: shared
})
export class SharedModule { }
