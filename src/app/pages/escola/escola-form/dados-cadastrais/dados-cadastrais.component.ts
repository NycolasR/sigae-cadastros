import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { validarCNPJ, validarCPF } from '../../../shared/validadores/documento-validador';
import { MSG_FORMULARIO_INVALIDO, MSG_PREENCHIMENTO_INCORRETO } from '../../../shared/mensagens/mensagens';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';
import { Router } from '@angular/router';
import { EscolaService } from '../../../service/escola.service';
import { Escola } from '../../../shared/models/escola/escola';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { SharedSigaeModule } from '../../../shared/shared.module';

@Component({
    selector: 'app-dados-cadastrais',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.scss'],
    providers: [MessageService],
    imports: [CommonModule, SharedSigaeModule, TooltipModule, ButtonModule, StepperModule, CheckboxModule, DropdownModule, FloatLabelModule, InputTextModule, InputMaskModule, FormsModule, RippleModule, ReactiveFormsModule]
})
export class DadosCadastraisComponent implements OnInit {
    escola: Escola = new Escola({});
    modoEdicao: boolean = false;
    formDadosCadastrais: FormGroup = new FormGroup({});

    idEscola = input(0);

    salvouDadosCadastrais = output<Escola>();

    constructor(
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly escolaService: EscolaService,
        private readonly messageService: MessageService,
        private readonly formularioService: FormularioService
    ) {}

    ngOnInit(): void {
        this.tratarModoEdicao();
        this.obterEscola();
    }

    private tratarModoEdicao(): void {
        this.modoEdicao = this.idEscola() !== 0;
    }

    private obterEscola() {
        const obterEscola = this.modoEdicao ? () => this.escolaService.buscarPorId(this.idEscola()) : () => this.escolaService.obterEscolaEmAndamento();

        obterEscola().subscribe((res: Escola | undefined) => {
            if (res) {
                this.escola = res;
                this.buildForm(res);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Houve um erro',
                    detail: `Não foi possível obter a escola com o ID informado.`
                });
                this.router.navigate(['/cadastros/escolas']);
            }
        });
    }

    buildForm(escola: Escola): void {
        this.formDadosCadastrais = this.formBuilder.group({
            nome: [escola.nome, Validators.required],
            cnpj: [escola.cnpj, validarCNPJ()]
        });
    }

    salvarDadosCadastrais(): void {
        if (this.formularioService.formularioIsValido(this.formDadosCadastrais)) {
            const atualizarEscola = this.modoEdicao ? () => this.escolaService.atualizar(this.idEscola(), this.formDadosCadastrais.value) : () => this.escolaService.atualizarEscolaEmAndamento(this.formDadosCadastrais.value);

            atualizarEscola().subscribe((res) => {
                if (res) {
                    if (!this.formDadosCadastrais.pristine) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso!',
                            detail: `Dados da escola de nome ${res.nome} salvos com sucesso!`
                        });
                    }
                    this.salvouDadosCadastrais.emit(res);
                }
            });
        }
    }
}
