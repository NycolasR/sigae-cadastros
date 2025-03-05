import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Escola } from '../shared/models/escola/escola';

@Injectable({
    providedIn: 'root'
})
export class EscolaService {
    private storageKey = 'escolas';
    private escolaEmAndamentoKey = 'escolaEmAndamento';

    constructor() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.escolaEmAndamentoKey)) {
            localStorage.setItem(this.escolaEmAndamentoKey, JSON.stringify(null));
        }
    }

    listarEscolasCadastradas(): Observable<Escola[]> {
        const escolas = this.getEscolasFromStorage()?.filter((p) => p.cadastroFinalizado) || [];
        return of(escolas);
    }

    buscarPorId(id: number): Observable<Escola | undefined> {
        const escola = this.getEscolasFromStorage().find((p) => p.id === id && p.cadastroFinalizado);
        return of(escola);
    }

    atualizar(id: number, dadosNovos: Partial<Escola>): Observable<Escola | undefined> {
        const escolas = this.getEscolasFromStorage();
        const index = escolas.findIndex((p) => p.id === id && p.cadastroFinalizado);
        if (index !== -1) {
            escolas[index] = { ...escolas[index], ...dadosNovos };
            this.saveEscolasToStorage(escolas);
            return of(escolas[index]);
        }
        return of(undefined);
    }

    excluir(id: number): Observable<boolean> {
        const escolas = this.getEscolasFromStorage();
        const index = escolas.findIndex((p) => p.id === id && p.cadastroFinalizado);
        if (index !== -1) {
            escolas.splice(index, 1);
            this.saveEscolasToStorage(escolas);
            return of(true);
        }
        return of(false);
    }

    obterEscolaEmAndamento(): Observable<Escola> {
        let escolaEmAndamento = this.getEscolaEmAndamentoFromStorage();

        if (!escolaEmAndamento) {
            escolaEmAndamento = new Escola({
                id: this.generateId(),
                nome: '',
                cadastroFinalizado: false
            });

            this.saveEscolaEmAndamentoToStorage(escolaEmAndamento);
        }

        return of(escolaEmAndamento);
    }

    criarEscolaEmAndamento(escola: Partial<Escola>): Observable<Escola | null> {
        const escolaEmAndamento = this.getEscolaEmAndamentoFromStorage();
        if (escolaEmAndamento) {
            return throwError(() => new Error('Já existe uma escola em andamento.'));
        }
        const novaEscola = new Escola({
            ...escola,
            id: this.generateId(),
            cadastroFinalizado: false
        });
        this.saveEscolaEmAndamentoToStorage(novaEscola);
        return of(novaEscola);
    }

    atualizarEscolaEmAndamento(dadosNovos: Partial<Escola>): Observable<Escola> {
        let escolaEmAndamento = this.getEscolaEmAndamentoFromStorage();

        if (!escolaEmAndamento) {
            escolaEmAndamento = new Escola({
                ...dadosNovos,
                id: this.generateId(),
                cadastroFinalizado: false
            });
            this.saveEscolaEmAndamentoToStorage(escolaEmAndamento);
            return of(escolaEmAndamento);
        }

        const escolaAtualizadaFinal = { ...escolaEmAndamento, ...dadosNovos };
        this.saveEscolaEmAndamentoToStorage(escolaAtualizadaFinal);
        return of(escolaAtualizadaFinal);
    }

    excluirEscolaEmAndamento(): Observable<boolean> {
        const escolaEmAndamento = this.getEscolaEmAndamentoFromStorage();
        if (escolaEmAndamento) {
            this.saveEscolaEmAndamentoToStorage(null);
            return of(true);
        }
        return of(false);
    }

    finalizarCadastroEmAndamento(): Observable<Escola | null> {
        const escolaEmAndamento = this.getEscolaEmAndamentoFromStorage();
        if (!escolaEmAndamento) {
            return throwError(() => new Error('Nenhuma escola em andamento para finalizar.'));
        }
        escolaEmAndamento.cadastroFinalizado = true;
        const escolas = [...this.getEscolasFromStorage(), escolaEmAndamento];
        this.saveEscolasToStorage(escolas);
        this.saveEscolaEmAndamentoToStorage(null);
        return of(escolaEmAndamento);
    }

    obterTotalDeEscolas(): number {
        return this.getEscolasFromStorage().length;
    }

    private getEscolasFromStorage(): Escola[] {
        const escolas = localStorage.getItem(this.storageKey);
        return escolas ? JSON.parse(escolas) : [];
    }

    private saveEscolasToStorage(escolas: Escola[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(escolas));
    }

    private getEscolaEmAndamentoFromStorage(): Escola | null {
        const escola = localStorage.getItem(this.escolaEmAndamentoKey);
        return escola ? JSON.parse(escola) : null;
    }

    private saveEscolaEmAndamentoToStorage(escola: Escola | null): void {
        localStorage.setItem(this.escolaEmAndamentoKey, JSON.stringify(escola));
    }

    private generateId(): number {
        const escolas = this.getEscolasFromStorage();
        const escolaEmAndamento = this.getEscolaEmAndamentoFromStorage();
        const ids = escolas.map((p) => p.id);
        if (escolaEmAndamento) {
            ids.push(escolaEmAndamento.id);
        }
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }
}
