import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { validarEmail } from '../../../shared/validadores/email-validator';
import { MSG_FORMULARIO_INVALIDO, MSG_PREENCHIMENTO_INCORRETO } from '../../../shared/mensagens/mensagens';
import { validarTelefone } from '../../../shared/validadores/telefone-validador';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';
import { Telefone } from '../../../shared/models/pessoa/telefone';
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
import { PessoaService } from '../../../../services/pessoa.service';

@Component({
    selector: 'app-dados-contato',
    templateUrl: './dados-contato.component.html',
    styleUrls: ['./dados-contato.component.scss'],
    providers: [MessageService],
    imports: [CommonModule, SharedSigaeModule, TooltipModule, ButtonModule, StepperModule, CheckboxModule, DropdownModule, FloatLabelModule, InputTextModule, InputMaskModule, FormsModule, RippleModule, ReactiveFormsModule]
})
export class DadosContatoComponent implements OnInit {
    pessoa: Pessoa = new Pessoa({});
    modoEdicao: boolean = false;
    formDadosContato: FormGroup = new FormGroup({});

    idPessoa = input(0);

    clicouBtnAnterior = output<boolean>();
    salvouDadosDeContato = output<Pessoa>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly pessoaService: PessoaService,
        private readonly messageService: MessageService,
        private readonly formularioService: FormularioService
    ) {}

    ngOnInit() {
        this.tratarModoEdicao();
        this.obterPessoa();
    }

    private tratarModoEdicao(): void {
        this.modoEdicao = this.idPessoa() !== 0;
    }

    private obterPessoa() {
        const obterPessoa = this.modoEdicao ? () => this.pessoaService.buscarPorId(this.idPessoa()) : () => this.pessoaService.obterPessoaEmAndamento();

        obterPessoa().subscribe((res: Pessoa | undefined) => {
            if (res) {
                this.pessoa = res;
                this.buildForm(res);
            }
        });
    }

    buildForm(pessoa: Pessoa): void {
        this.formDadosContato = this.formBuilder.group({
            email: [pessoa.email, [Validators.required, validarEmail()]],
            telefones: this.formBuilder.array(pessoa.telefones && pessoa.telefones.length > 0 ? pessoa.telefones.map((telefone) => this.criarTelefoneControl(telefone.numero)) : [this.criarTelefoneControl()])
        });
    }

    criarTelefoneControl(numero: string | null = null): FormGroup {
        return this.formBuilder.group({
            numero: [numero, validarTelefone()]
        });
    }

    get telefones(): FormArray {
        return this.formDadosContato.get('telefones') as FormArray;
    }

    adicionarTelefone(): void {
        this.telefones.push(this.criarTelefoneControl());
    }

    removerTelefone(index: number): void {
        if (this.telefones.length > 1) {
            this.telefones.removeAt(index);
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Telefone excluído com sucesso!'
            });
        }
    }

    getTelefoneFormGroup(index: number): FormGroup {
        return this.telefones.at(index) as FormGroup;
    }

    salvarDadosContato(): void {
        if (this.formularioService.formularioIsValido(this.formDadosContato)) {
            const dadosContato = {
                ...this.formDadosContato.value,
                telefones: this.formDadosContato.value.telefones.filter((telefone: Telefone) => telefone.numero)
            };
            const atualizarPessoa = this.modoEdicao ? () => this.pessoaService.atualizar(this.idPessoa(), dadosContato) : () => this.pessoaService.atualizarPessoaEmAndamento(dadosContato);

            atualizarPessoa().subscribe((res) => {
                if (res) {
                    if (!this.formDadosContato.pristine) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso!',
                            detail: 'Dados de contato salvos com sucesso!'
                        });
                    }
                    this.salvouDadosDeContato.emit(res);
                }
            });
        }
    }
}
