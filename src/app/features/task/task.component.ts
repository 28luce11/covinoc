import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { messages } from '../../shared/constants/message.constant';
import { Task } from 'src/app/shared/models/task.interface';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('searchInput')
    searchInput: ElementRef;

    private readonly destroy$ = new Subject();

    tasks: Task[];
    filteredTasks: Task[];
    filteredSearchTasks: Task[];
    resetFormSubject$ = new Subject<boolean>();
    page = 1;
    pageSize = 4;
    searchCriteria: string;

    constructor(private servicesTask: TaskService, private toastService: ToastService) { }

    ngOnInit(): void {
        this.getTasks();
    }

    ngAfterViewInit(): void {
        this.searchInputEventInit();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    checkboxChange(task: Task, newValue: boolean): void {
        this.servicesTask.updateTask(task.id, newValue)
            .subscribe((res: Task) => {
                task.state = res.state;
                this.toastService.showSuccess(messages.update);
            }, () => {
                this.toastService.showFail();
            });
    }

    deleteTask(id: string): void {
        this.servicesTask.deleteTask(id)
            .subscribe((res: Task) => {
                const pos = this.tasks.findIndex(task => task.id === res.id);
                this.tasks.splice(pos, 1);
                this.filterByCriteria(this.searchCriteria);
                this.toastService.showSuccess(messages.delete);
            }, () => {
                this.toastService.showFail();
            });
    }

    saveTask(task: Task): void {
        this.servicesTask.saveTask(task)
            .subscribe((res: Task) => {
                this.resetFormSubject$.next(true);
                this.tasks.push(res);
                this.filterByCriteria(this.searchCriteria);
                this.toastService.showSuccess(messages.add);
            }, () => {
                this.toastService.showFail();
            });
    }

    refreshTask(): void {
        this.filteredTasks = this.filteredSearchTasks
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

    private getTasks(): void {
        this.servicesTask.getTasks()
            .subscribe((res: Task[]) => {
                this.tasks = res;
                this.filteredSearchTasks = res;
                this.refreshTask();
            }, () => {
                this.toastService.showFail();
            });
    }

    private searchInputEventInit(): void {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(250),
                map((event: any) => event.target.value),
                distinctUntilChanged()
            )
            .subscribe((value: string) => {
                this.searchCriteria = value;
                this.filterByCriteria(value);
            });
    }

    private filterByCriteria(criteria: string): void {
        if (criteria) {
            this.filteredSearchTasks = this.tasks.filter(res => {
                return res.title.toLowerCase().includes(criteria.toLowerCase());
            });
        } else {
            this.filteredSearchTasks =  this.tasks;
        }
        this.refreshTask();
    }
}
