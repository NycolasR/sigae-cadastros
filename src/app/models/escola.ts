export class Escola {
    id: number;
    nome: string;
    cadastroFinalizado: boolean;

    constructor(escola) {
        if(!escola) return;
        this.id = escola.id;
        this.nome = escola.nome;
        this.cadastroFinalizado = true;
    }
}