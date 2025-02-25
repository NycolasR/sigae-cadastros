import { Escola } from "./escola";

export class Pessoa {
    id: number;
    nome: string;
    escola: Escola;
    cadastroFinalizado: boolean;

    constructor(pessoa) {
        if(!pessoa) return;
        this.id = pessoa.id;
        this.nome = pessoa.nome;
        this.escola = pessoa.escola;
        this.cadastroFinalizado = true;
    }
}