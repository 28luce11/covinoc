import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from 'src/app/shared/models/task.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServicesTaskService {
    baseUrl = 'https://608adc0d737e470017b7410f.mockapi.io/api/v1/todos';

    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.baseUrl);
    }
}
