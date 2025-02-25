import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MSG_FORMULARIO_INVALIDO, MSG_PREENCHIMENTO_INCORRETO } from '../../../shared/mensagens/mensagens';
import { validarCep } from '../../../shared/validadores/cep-validador';
import { EnderecoService } from '../../../shared/services/endereco/endereco.service';
import { Pais } from '../../../shared/models/endereco/pais';
import { Estado } from '../../../shared/models/endereco/estado';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { Cep } from '../../../shared/models/endereco/cep';
import { Municipio } from './../../../shared/models/endereco/municipio';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';
import { Endereco } from './../../../shared/models/endereco/endereco';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { SharedSigaeModule } from '../../../shared/shared.module';
import { PessoaService } from '../../../../services/pessoa.service';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-dados-endereco',
    templateUrl: './dados-endereco.component.html',
    styleUrls: ['./dados-endereco.component.scss'],
    providers: [MessageService],
    imports: [CommonModule, SharedSigaeModule, SelectModule, TooltipModule, ButtonModule, StepperModule, CheckboxModule, DropdownModule, FloatLabelModule, InputTextModule, InputMaskModule, FormsModule, RippleModule, ReactiveFormsModule]
})
export class DadosEnderecoComponent implements OnInit {
    pessoa: Pessoa = new Pessoa({});
    modoEdicao: boolean = false;
    isPaisBrasil: boolean = false;
    formDadosEndereco: FormGroup = new FormGroup({});

    paises: Pais[] = [];
    estados: Estado[] = [];
    municipios: Municipio[] = [];

    idPessoa = input(0);

    clicouBtnAnterior = output<boolean>();

    constructor(
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly pessoaService: PessoaService,
        private readonly messageService: MessageService,
        private readonly enderecoService: EnderecoService,
        private readonly formularioService: FormularioService
    ) {}

    ngOnInit() {
        this.tratarModoEdicao();
        this.obterPessoa();
        this.consultarPaises();
        this.consultarEstados();

        this.formDadosEndereco.get('estado')?.valueChanges.subscribe((estado: Estado) => {
            this.alterarEstadoCampoMunicipio(estado);
        });

        this.formDadosEndereco.get('cep')?.valueChanges.subscribe((cep: string) => {
            if (!this.formDadosEndereco.get('cep')?.invalid) {
                this.preencherCamposViaDadosCep(cep);
            }
        });

        this.formDadosEndereco.get('pais')?.valueChanges.subscribe((pais: Pais) => {
            this.tratarAlteracaoDePais(pais);
        });
    }

    private tratarModoEdicao(): void {
        this.modoEdicao = this.idPessoa() !== 0;
    }

    private obterPessoa() {
        const obterPessoa = this.modoEdicao ? () => this.pessoaService.buscarPorId(this.idPessoa()) : () => this.pessoaService.obterPessoaEmAndamento();

        obterPessoa().subscribe((res: Pessoa | undefined) => {
            if (res) {
                this.pessoa = res;

                if (!!res.endereco) {
                    this.tratarAlteracaoDePais(res.endereco.pais);
                    this.alterarEstadoCampoMunicipio(res.endereco.estado);
                } else {
                    this.formDadosEndereco.get('municipio')?.disable();
                }
                this.buildForm(res.endereco ?? null);
            }
        });
    }

    private tratarAlteracaoDePais(pais: Pais) {
        this.isPaisBrasil = pais.name.common === 'Brazil';

        if (!this.isPaisBrasil) {
            this.formDadosEndereco.get('estado')?.setValue(null);
            this.formDadosEndereco.get('municipio')?.setValue(null);
            this.formDadosEndereco.get('municipio')?.enable();
        } else {
            this.formDadosEndereco.get('municipio')?.disable();
        }
    }

    buildForm(endereco: Endereco | null): void {
        this.formDadosEndereco = this.formBuilder.group({
            enderecoCompleto: [endereco?.enderecoCompleto, Validators.required],
            cep: [endereco?.cep, validarCep()],
            pais: [endereco?.pais, Validators.required],
            estado: [this.isPaisBrasil ? endereco?.estado : endereco?.estado.nome, Validators.required],
            municipio: [endereco?.municipio, Validators.required]
        });
    }

    preencherCamposViaDadosCep(cep: string): void {
        this.enderecoService.consultarCep(cep).subscribe((res: Cep) => {
            this.setarPaisBrasil();
            this.preencherEndereco(res.logradouro);
            this.selecionarEstado(res.estado);
            this.selecionarMunicipio(res.localidade);
        });
    }

    private preencherEndereco(logradouro: string | undefined): void {
        if (logradouro) {
            this.formDadosEndereco.get('enderecoCompleto')?.setValue(logradouro);
        }
    }

    private selecionarEstado(nomeEstado: string | undefined): void {
        if (!nomeEstado) {
            return;
        }

        const estadoEncontrado = this.encontrarEstadoPorNome(nomeEstado);

        if (estadoEncontrado) {
            this.formDadosEndereco.get('estado')?.setValue(estadoEncontrado);
        }
    }

    private encontrarEstadoPorNome(nomeEstado: string): Estado | undefined {
        return this.estados.find((estado: Estado) => estado.nome.toLowerCase() === nomeEstado.toLowerCase());
    }

    private selecionarMunicipio(nomeMunicipio: string | undefined) {
        setTimeout(() => {
            if (!nomeMunicipio) {
                return;
            }
            const municipio = this.encontrarMunicipioPorNome(nomeMunicipio);

            if (municipio) {
                this.formDadosEndereco.get('municipio')?.setValue(municipio);
            }
        }, 300);
    }

    private encontrarMunicipioPorNome(nomeMunicipio: string): Municipio | undefined {
        return this.municipios.find((municipio: Municipio) => municipio.nome.toLowerCase() === nomeMunicipio.toLowerCase());
    }

    alterarEstadoCampoMunicipio(estado: Estado): void {
        if (!!estado) {
            this.formDadosEndereco.get('municipio')?.enable();

            if (!!estado.id) {
                this.carregarMunicipios(estado.id);
            }
        } else {
            this.desabilitarCampoMunicipio();
        }
    }

    private desabilitarCampoMunicipio(): void {
        this.formDadosEndereco.get('municipio')?.disable();
        this.municipios = [];
    }

    private carregarMunicipios(estadoId: number): void {
        this.enderecoService.consultarMunicipios(estadoId).subscribe(
            (municipios) => {
                this.municipios = municipios;
            },
            (error) => {
                this.municipios = [];
            }
        );
    }

    consultarPaises(): void {
        this.enderecoService.consultarPaises().subscribe((res) => {
            this.paises = res;

            if (!this.modoEdicao) {
                this.setarPaisBrasil();
            }
        });
    }

    private setarPaisBrasil(): void {
        const paisBrasil = this.paises.find((pais: Pais) => pais.name.common === 'Brazil');

        this.formDadosEndereco.get('pais')?.setValue(paisBrasil);
    }

    consultarEstados(): void {
        this.enderecoService.consultarEstados().subscribe((res) => {
            this.estados = res;
        });
    }

    salvarDadosEndereco(): void {
        if (this.formularioService.formularioIsValido(this.formDadosEndereco)) {
            if (!this.isPaisBrasil) {
                this.formDadosEndereco.get('estado')?.setValue(
                    new Estado({
                        nome: this.formDadosEndereco.get('estado')?.value
                    })
                );
            }

            const atualizarPessoa = this.modoEdicao
                ? () =>
                      this.pessoaService.atualizar(this.idPessoa(), {
                          endereco: this.formDadosEndereco.value
                      })
                : () =>
                      this.pessoaService.atualizarPessoaEmAndamento({
                          endereco: this.formDadosEndereco.value
                      });

            atualizarPessoa().subscribe((res) => {
                if (res) {
                    if (!this.formDadosEndereco.pristine) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso!',
                            detail: `Dados do endereço salvos com sucesso!`
                        });
                    }
                    if (!this.modoEdicao) {
                        this.pessoaService.finalizarCadastroEmAndamento();
                    }
                    this.router.navigate(['/pessoas']);
                }
            });
        }
    }
}
