import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mensagem-alerta',
    templateUrl: './mensagem-alerta.component.html',
    styleUrls: ['./mensagem-alerta.component.scss'],
    standalone: false
})
export class MensagemAlertaComponent {
    campo = input.required<string>();
    mensagem = input.required<string>();
    tipoAlerta = input.required<string>();
    formulario = input.required<FormGroup>();

    constructor() {}

    isCampoValido() {
        return this.formulario().get(this.campo())?.touched && this.formulario().get(this.campo())?.hasError(this.tipoAlerta());
    }
}
