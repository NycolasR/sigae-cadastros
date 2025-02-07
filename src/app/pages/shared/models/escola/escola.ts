import { Endereco } from '../endereco/endereco';

export class Escola {
    id: number;
    nome: string;
    cnpj?: string;
    endereco?: Endereco;
    cadastroFinalizado?: boolean;

    constructor(data: Partial<Escola>) {
        this.id = data.id!;
        this.nome = data.nome!;
        this.cnpj = data.cnpj;
        this.endereco = data.endereco;
        this.cadastroFinalizado = data.cadastroFinalizado ?? false;
    }
}
