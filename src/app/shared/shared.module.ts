import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { AddTaskComponent } from './components/add-task/add-task.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/toast/toast.component';

const shared = [
  // components
  HeaderComponent,
  AddTaskComponent,
  ToastComponent
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
    ReactiveFormsModule,
    NgbToastModule
  ],
  exports
})
export class SharedModule { }
