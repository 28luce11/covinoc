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
        this.getTasks();
    }

    getTasks(): void {
        this.servicesTask.getTasks().subscribe((res: Task[]) => {
            this.tasks = res;
        });
    }

    checkboxChange(task: Task, newValue: boolean): void {
        this.servicesTask.updateTask(task.id, newValue).subscribe((res: Task) => {
            task.state = res.state;
        });
    }

    deleteTask(id: string): void {
        this.servicesTask.deleteTask(id).subscribe((res: Task) => {
            const pos = this.tasks.findIndex(task => task.id === res.id);
            this.tasks.splice(pos, 1);
        });
    }

    saveTask(task: Task): void {
        this.servicesTask.saveTask(task).subscribe((res: Task) => {
            this.tasks.push(res);
        });
    }
}
