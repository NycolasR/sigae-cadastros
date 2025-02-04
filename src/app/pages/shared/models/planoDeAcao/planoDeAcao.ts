import { Objetivo } from './objetivo';

export class PlanoDeAcao {
  id: number;
  descricao: string;
  objetivos: Objetivo[];
  cadastroFinalizado: boolean;

  constructor(data: Partial<PlanoDeAcao>) {
    this.id = data.id!;
    this.descricao = data.descricao!;
    this.objetivos = data.objetivos ?? [];
    this.cadastroFinalizado = data.cadastroFinalizado ?? false;
  }
}
