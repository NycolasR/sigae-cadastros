import { Acao } from './acao';
import { Categoria } from './categoria';
import { Etapa } from './etapa';

export class Problema {
  id: number;
  descricaoProblema?: string;
  etapa?: Etapa;
  possuiCausa?: boolean;
  resultado?: string;
  prioridade?: boolean;
  categoria?: Categoria;
  acoes: Acao[];

  constructor(dados: Partial<Problema>) {
    this.id = dados.id ?? 0;
    this.descricaoProblema = dados.descricaoProblema ?? '';
    this.etapa = dados.etapa;
    this.possuiCausa = dados.possuiCausa ?? false;
    this.resultado = dados.resultado;
    this.prioridade = dados.prioridade ?? false;
    this.categoria = dados.categoria;
    this.acoes = dados.acoes ?? [];
  }
}
