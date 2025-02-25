import { Routes } from '@angular/router';

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
