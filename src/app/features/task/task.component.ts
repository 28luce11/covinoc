import { Component, OnInit } from '@angular/core';

import { ServicesTaskService } from 'src/app/core/services/services-task.service';
import { Task } from 'src/app/shared/models/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[];

  constructor(private servicesTask: ServicesTaskService) { }

  ngOnInit(): void {
    this.getTareas();
  }

  getTareas() {
    this.servicesTask.getTasks().subscribe((res: Task[]) => {
        this.tasks = res;
    });
}

}
