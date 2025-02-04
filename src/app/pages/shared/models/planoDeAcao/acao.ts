import { Pessoa } from '../pessoa/pessoa';

export class Acao {
  id: number;
  descricao: string;
  responsavel: Pessoa;

  constructor(dados: Partial<Acao>) {
    this.id = dados.id ?? 0;
    this.descricao = dados.descricao ?? '';
    this.responsavel = dados.responsavel!;
  }
}
