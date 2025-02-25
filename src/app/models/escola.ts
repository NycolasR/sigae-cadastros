export class Escola {
    id: number;
    nome: string;

    constructor(escola) {
        if(!escola) return;
        this.id = escola.id;
        this.nome = escola.nome;
    }
}