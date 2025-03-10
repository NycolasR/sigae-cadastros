import { EscolaService } from '../../services/escola.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { SharedSigaeModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Escola } from '../shared/models/escola/escola';
import { AutenticacaoService } from 'autenticacao';
import { User } from '@auth0/auth0-angular';

@Component({
    selector: 'app-escola',
    templateUrl: './escola.component.html',
    styleUrls: ['./escola.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedSigaeModule, TableModule, TooltipModule, ButtonModule, RouterModule],
    providers: [MessageService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EscolaComponent implements OnInit, OnDestroy {
    escolas!: Escola[];

    isAuthenticated: boolean;
    usuario: User | null | undefined;

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
        private autenticacaoService: AutenticacaoService,
        private readonly messageService: MessageService
    ) {
        this.checkUsuarioLogado();
    }

    ngOnInit() {
        this.listarEscolasCadastradas();
        this.observaLocalStorage();
    }

    ngOnDestroy(): void {
        window.removeEventListener('storageChanged', () => {  });
    }

    async checkUsuarioLogado() {
        await this.autenticacaoService.isAuthenticated.subscribe({ next:(v) => this.isAuthenticated = v, error: (e) => this.isAuthenticated = false});
        await this.autenticacaoService.user.subscribe({ next:(v) => this.usuario = v, error: (e) => console.error(e)});
        console.log("isAuthenticated", this.isAuthenticated);
        console.log("usuario", this.usuario);
    }
    
    getName(): string {
        if(!!this.usuario && !!this.usuario.name) {
            let names = this.usuario?.name.split('@');
            return names[0];
        }
        return "";
    }

    observaLocalStorage() {
        window.addEventListener("storageChanged", () => { this.listarEscolasCadastradas() });
    }

    listarEscolasCadastradas(): void {
        this.escolaService.listarEscolasCadastradas().subscribe((res: Escola[]) => {
            this.escolas = res;
        });
    }

    adicionarEscola() {
        this.router.navigate(['/cadastros/escolas/formulario/adicionar']);
    }

    editarEscola(idEscola: number) {
        this.router.navigate([`/cadastros/escolas/formulario/editar/${idEscola}`]);
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
