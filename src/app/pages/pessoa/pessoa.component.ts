import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Pessoa } from '../shared/models/pessoa/pessoa';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { SharedSigaeModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Estado } from '../shared/models/endereco/estado';
import { Municipio } from '../shared/models/endereco/municipio';
import { Escola } from '../shared/models/escola/escola';
import { Telefone } from '../shared/models/pessoa/telefone';
import { Endereco } from '../shared/models/endereco/endereco';
import { EscolaService } from '../../services/escola.service';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-pessoa',
    templateUrl: './pessoa.component.html',
    styleUrls: ['./pessoa.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedSigaeModule, ToastModule, TableModule, TooltipModule, ButtonModule, RippleModule, RouterModule],
    providers: [MessageService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PessoaComponent implements OnInit, OnDestroy {
    pessoas!: Pessoa[];

    colunas = [
        {
            field: 'nome',
            header: 'Nome',
            width: 'width: 15rem'
        },
        {
            field: 'cpf',
            header: 'CPF',
            width: 'width: 15rem'
        },
        {
            field: 'email',
            header: 'E-mail',
            width: 'width: 15rem'
        },
        {
            field: 'escola.nome',
            header: 'Escola',
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
        private readonly pessoaService: PessoaService,
        private readonly escolaService: EscolaService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit() {
        this.listarPessoasCadastradas();
        this.observaLocalStorage();
    }

    ngOnDestroy(): void {
        window.removeEventListener('storageChanged', () => {  });
    }

    observaLocalStorage() {
        window.addEventListener("storageChanged", () => { this.listarPessoasCadastradas() });
    }

    listarPessoasCadastradas(): void {
        this.pessoaService.listarPessoasCadastradas().subscribe((res: Pessoa[]) => {
            this.pessoas = res;
        });
    }

    adicionarPessoa() {
        this.escolaService.listarEscolasCadastradas().subscribe((res: Escola[]) => {
            res.length === 0
                ? this.messageService.add({
                      severity: 'error',
                      summary: 'Houve um erro',
                      detail: `É preciso ter ao menos uma escola cadastrada.`
                  })
                : this.router.navigate(['/pessoas/formulario/adicionar']);
        });
    }

    editarPessoa(idPessoa: number) {
        this.router.navigate([`/pessoas/formulario/editar/${idPessoa}`]);
    }

    excluirPessoa(idPessoa: number): void {
        this.pessoaService.excluir(idPessoa).subscribe((res: boolean) => {
            if (res) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: `Pessoa excluída com sucesso!`
                });
                this.listarPessoasCadastradas();
            }
        });
    }
}
