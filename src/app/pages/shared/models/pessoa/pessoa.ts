import { Endereco } from '../endereco/endereco';
import { Escola } from './escola';
import { Telefone } from './telefone';

export class Pessoa {
  id: number;
  nome: string;
  nomeSocial?: string;
  isPessoaJuridica: boolean;
  cpf?: string;
  cnpj?: string;
  escola: Escola;
  email: string;
  telefones?: Telefone[];
  endereco?: Endereco;
  cadastroFinalizado?: boolean;

  constructor(data: Partial<Pessoa>) {
    this.id = data.id!;
    this.nome = data.nome!;
    this.nomeSocial = data.nomeSocial;
    this.isPessoaJuridica = data.isPessoaJuridica!;
    this.cpf = data.cpf;
    this.cnpj = data.cnpj;
    this.escola = data.escola!;
    this.email = data.email!;
    this.telefones = data.telefones;
    this.endereco = data.endereco;
    this.cadastroFinalizado = data.cadastroFinalizado ?? false;
  }
}
