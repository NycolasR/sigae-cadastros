import { Routes } from '@angular/router';
import { PessoaComponent } from './pessoa.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

export default [
    { path: '', component: PessoaComponent },
    {
        path: 'formulario',
        children: [
            {
                path: 'adicionar',
                component: PessoaFormComponent
            },
            {
                path: 'editar/:idPessoa',
                component: PessoaFormComponent
            }
        ]
    }
] as Routes;
