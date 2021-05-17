import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './components/header/header.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

const shared = [
  // components
  HeaderComponent,
  AddTaskComponent
];

const exports = [
  ...shared,
  NgbPaginationModule,
  NgbToastModule
];

@NgModule({
  declarations: shared,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports
})
export class SharedModule { }
