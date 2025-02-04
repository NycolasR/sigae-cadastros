import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../../models/planoDeAcao/categoria';
@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor() {}

  obterCategorias(): Observable<Categoria[]> {
    const categorias: Categoria[] = this.gerarMockCategorias();
    return of(categorias);
  }

  private gerarMockCategorias(): Categoria[] {
    return Array.from({ length: 10 }, (_, index) => {
      return new Categoria({
        id: index + 1,
        descricao: `Categoria ${index + 1}`,
      });
    });
  }
}
