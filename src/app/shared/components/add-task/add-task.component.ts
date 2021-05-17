import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Task } from '../../models/task.interface';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
    @Output()
    createNewTask = new EventEmitter();

    @Input()
    resetForm: Observable<boolean>;

    private readonly destroy$ = new Subject();

    formRegisterTask: FormGroup;
    showForm = false;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
        this.resetFormInit();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    resetFormInit(): void {
        this.resetForm
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.formRegisterTask.reset();
                this.showForm = false;
            });
    }

    buildForm() {
        this.formRegisterTask = this.formBuilder.group({
            title: ['', Validators.required],
            state: [false]
        });
    }

    send(value: Task) {
        this.createNewTask.emit(value);
    }
}
