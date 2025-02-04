import { Component, input } from '@angular/core';

@Component({
    selector: 'app-titulo-pagina',
    templateUrl: './titulo-pagina.component.html',
    styleUrls: ['./titulo-pagina.component.scss'],
    standalone: false
})
export class TituloPaginaComponent {
    titulo = input.required<string>();

    constructor() {}
}
