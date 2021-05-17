import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { ServicesTaskService } from 'src/app/core/services/services-task.service';
import { Task } from 'src/app/shared/models/task.interface';
import { messages } from '../../shared/constants/message.constant';

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

    constructor(private servicesTask: ServicesTaskService) { }

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
            this.successAction(messages.add);
        }, () => {
            this.failedAction();
        });
    }

    deleteTask(id: string): void {
        this.servicesTask.deleteTask(id).subscribe((res: Task) => {
            const pos = this.tasks.findIndex(task => task.id === res.id);
            this.tasks.splice(pos, 1);
            this.filterByCriteria(this.searchCriteria);
        });
    }

    saveTask(task: Task): void {
        this.servicesTask.saveTask(task).subscribe((res: Task) => {
            this.resetFormSubject$.next(true);
            this.tasks.push(res);
            this.filterByCriteria(this.searchCriteria);
        });
    }

    refreshTask(): void {
        this.filteredTasks = this.filteredSearchTasks
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

    private getTasks(): void {
        this.servicesTask.getTasks().subscribe((res: Task[]) => {
            this.tasks = res;
            this.filteredSearchTasks = res;
            this.refreshTask();
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

    private failedAction(): void {
        messages.error;
    }

    private successAction(message: string): void {

    }
}
