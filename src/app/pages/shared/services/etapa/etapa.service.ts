import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Etapa } from '../../models/planoDeAcao/etapa';

@Injectable({
  providedIn: 'root',
})
export class EtapaService {
  constructor() {}

  obterEtapas(): Observable<Etapa[]> {
    const etapas: Etapa[] = this.gerarMockEtapas();
    return of(etapas);
  }

  private gerarMockEtapas(): Etapa[] {
    return Array.from({ length: 10 }, (_, index) => {
      return new Etapa({
        id: index + 1,
        descricao: `Etapa ${index + 1}`,
      });
    });
  }
}
