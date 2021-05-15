import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './features/task/task.component';

const routes: Routes = [
    {
        path: 'tarea',
        loadChildren: () => import('./features/task/task.module').then(m => m.TaskModule),
    },
    {
        path: '**',
        redirectTo: 'tarea',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
