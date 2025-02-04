import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Escola } from '../../models/pessoa/escola';

@Injectable({
  providedIn: 'root',
})
export class EscolaService {
  constructor() {}

  obterEscolas(): Observable<Escola[]> {
    const escolas: Escola[] = this.gerarMockEscolas();
    return of(escolas);
  }

  private gerarMockEscolas(): Escola[] {
    return Array.from({ length: 10 }, (_, index) => {
      return new Escola({
        id: index + 1,
        nome: `Escola ${index + 1}`,
      });
    });
  }
}
