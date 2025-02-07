import { Routes } from '@angular/router';
import { EscolaComponent } from './escola.component';
import { EscolaFormComponent } from './escola-form/escola-form.component';

export default [
    { path: '', component: EscolaComponent },
    {
        path: 'formulario',
        children: [
            {
                path: 'adicionar',
                component: EscolaFormComponent
            },
            {
                path: 'editar/:idEscola',
                component: EscolaFormComponent
            }
        ]
    }
] as Routes;
