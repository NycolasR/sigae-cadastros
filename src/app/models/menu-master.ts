import { Escola } from "./escola";
import { Pessoa } from "./pessoa";

export class MenuMaster {
    escola: Escola;
    pessoa: Pessoa;

    constructor(dados?) {
        if(!dados) {
            return;
        }
        
        this.escola = new Escola(dados['escola']);
        this.pessoa = new Pessoa(dados['pessoa']);
    }
}