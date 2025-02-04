import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { SharedSigaeModule } from '../../shared/shared.module';
import { DadosCadastraisComponent } from './dados-cadastrais/dados-cadastrais.component';
import { DadosContatoComponent } from './dados-contato/dados-contato.component';
import { DadosEnderecoComponent } from './dados-endereco/dados-endereco.component';

@Component({
    selector: 'app-pessoa-form',
    templateUrl: './pessoa-form.component.html',
    styleUrls: ['./pessoa-form.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        SharedSigaeModule,
        TooltipModule,
        ButtonModule,
        StepperModule,
        CheckboxModule,
        DropdownModule,
        FloatLabelModule,
        InputTextModule,
        InputMaskModule,
        FormsModule,
        RippleModule,
        ReactiveFormsModule,
        DadosCadastraisComponent,
        DadosContatoComponent,
        DadosEnderecoComponent
    ]
})
export class PessoaFormComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute) {}

    idPessoa: number = 0;

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('idPessoa');
            if (id) {
                this.idPessoa = +id;
            }
        });
    }
}
