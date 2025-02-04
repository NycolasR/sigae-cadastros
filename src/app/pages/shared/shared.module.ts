import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MensagemAlertaComponent } from './components/mensagem-alerta/mensagem-alerta.component';
import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    exports: [MensagemAlertaComponent, TituloPaginaComponent],
    declarations: [MensagemAlertaComponent, TituloPaginaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [HttpClient]
})
export class SharedSigaeModule {}
