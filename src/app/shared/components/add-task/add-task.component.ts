import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Task } from '../../models/task.interface';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
    @Output()
    createNewTask = new EventEmitter();

    formRegisterTask: FormGroup;
    showForm = false;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
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
