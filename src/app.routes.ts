import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: 'pessoas',
        loadChildren: () => import('./app/pages/pessoa/pessoa.routes').then((m) => m.default)
    },
    {
        path: 'escolas',
        loadChildren: () => import('./app/pages/escola/escola.routes').then((m) => m.default)
    }
];
