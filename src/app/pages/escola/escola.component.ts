import { EscolaService } from '../service/escola.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SharedSigaeModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Estado } from '../shared/models/endereco/estado';
import { Municipio } from '../shared/models/endereco/municipio';
import { Escola } from '../shared/models/escola/escola';
import { Endereco } from '../shared/models/endereco/endereco';

@Component({
    selector: 'app-escola',
    templateUrl: './escola.component.html',
    styleUrls: ['./escola.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedSigaeModule, TableModule, TooltipModule, ButtonModule, RippleModule],
    providers: [MessageService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EscolaComponent implements OnInit {
    escolas!: Escola[];

    colunas = [
        {
            field: 'nome',
            header: 'Nome',
            width: 'width: 15rem'
        },
        {
            field: 'cnpj',
            header: 'CNPJ',
            width: 'width: 15rem'
        },
        {
            field: 'endereco.municipio.nome',
            header: 'Endereço',
            width: 'width: 20rem'
        }
    ];

    constructor(
        private readonly router: Router,
        private readonly escolaService: EscolaService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit() {
        this.listarEscolasCadastradas();
    }

    listarEscolasCadastradas(): void {
        this.escolaService.listarEscolasCadastradas().subscribe((res: Escola[]) => {
            this.escolas = res;
        });
    }

    adicionarEscola() {
        this.router.navigate(['/escolas/formulario/adicionar']);
    }

    editarEscola(idEscola: number) {
        this.router.navigate([`/escolas/formulario/editar/${idEscola}`]);
    }

    excluirEscola(idEscola: number): void {
        this.escolaService.excluir(idEscola).subscribe((res: boolean) => {
            if (res) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: `Escola excluída com sucesso!`
                });
                this.listarEscolasCadastradas();
            }
        });
    }
}
