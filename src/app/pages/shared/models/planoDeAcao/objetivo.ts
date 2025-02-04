import { Problema } from './problema';

export class Objetivo {
  id: number;
  nome: string;
  problemas: Problema[];
  selecionado: boolean;

  constructor(dados: Partial<Objetivo>) {
    this.id = dados.id ?? 0;
    this.nome = dados.nome ?? '';
    this.problemas = dados.problemas ?? [];
    this.selecionado = dados.selecionado ?? false;
  }
}
