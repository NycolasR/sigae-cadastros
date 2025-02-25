import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { Pessoa } from '../pages/shared/models/pessoa/pessoa';
import { MenuMasterService } from './menu-master.service';
import { MenuMaster } from '../models/menu-master';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    private storageKey = 'pessoas';
    private pessoaEmAndamentoKey = 'pessoaEmAndamento';

    constructor(
        private menuMasterService: MenuMasterService,
        private http: HttpClient
    ) {
        // if (!localStorage.getItem(this.storageKey)) {
        //     localStorage.setItem(this.storageKey, JSON.stringify([]));
        // }
        // if (!localStorage.getItem(this.pessoaEmAndamentoKey)) {
        //     localStorage.setItem(this.pessoaEmAndamentoKey, JSON.stringify(null));
        // }
    }

    filtraPessoas(pessoas) {
        const filtro = this.menuMasterService.getFiltro();
        return pessoas.filter((p) => {
            if(!!filtro && (!!filtro?.escola && !!filtro?.escola.id) || (!!filtro?.pessoa && !!filtro?.pessoa.id)) {
                if(!!filtro?.pessoa && !!filtro?.pessoa.id) {
                    return (p.cadastroFinalizado && p.id == filtro?.pessoa.id);
                } else if((!!filtro?.escola && !!filtro?.escola.id)) {
                    return (p.cadastroFinalizado && p.escola.id == filtro?.escola.id);
                }
            }
            return p.cadastroFinalizado;
        });
    }

    listarPessoasCadastradas(): Observable<Pessoa[]> {
        if(this.possuiPessoasInStorage()) {
            const pessoas = this.filtraPessoas(this.getPessoasFromStorage()) || [];
            return of(pessoas);
        }

        return this.http.get<any[]>("https://example.com/pessoas").pipe(
            map(pessoas => 
              this.filtraPessoas(pessoas)
            )
          );
    }

    buscarPorId(id: number): Observable<Pessoa | undefined> {
        const pessoa = this.getPessoasFromStorage().find((p) => p.id === id && p.cadastroFinalizado);
        return of(pessoa);
    }

    atualizar(id: number, dadosNovos: Partial<Pessoa>): Observable<Pessoa | undefined> {
        const pessoas = this.getPessoasFromStorage();
        const index = pessoas.findIndex((p) => p.id === id && p.cadastroFinalizado);
        if (index !== -1) {
            pessoas[index] = { ...pessoas[index], ...dadosNovos };
            this.savePessoasToStorage(pessoas);
            return of(pessoas[index]);
        }
        return of(undefined);
    }

    excluir(id: number): Observable<boolean> {
        const pessoas = this.getPessoasFromStorage();
        const index = pessoas.findIndex((p) => p.id === id && p.cadastroFinalizado);
        if (index !== -1) {
            pessoas.splice(index, 1);
            this.savePessoasToStorage(pessoas);
            return of(true);
        }
        return of(false);
    }

    obterPessoaEmAndamento(): Observable<Pessoa> {
        let pessoaEmAndamento = this.getPessoaEmAndamentoFromStorage();

        if (!pessoaEmAndamento) {
            pessoaEmAndamento = new Pessoa({
                id: this.generateId(),
                nome: '',
                email: '',
                cadastroFinalizado: false
            });

            this.savePessoaEmAndamentoToStorage(pessoaEmAndamento);
        }

        return of(pessoaEmAndamento);
    }

    criarPessoaEmAndamento(pessoa: Partial<Pessoa>): Observable<Pessoa | null> {
        const pessoaEmAndamento = this.getPessoaEmAndamentoFromStorage();
        if (pessoaEmAndamento) {
            return throwError(() => new Error('Já existe uma pessoa em andamento.'));
        }
        const novaPessoa = new Pessoa({
            ...pessoa,
            id: this.generateId(),
            cadastroFinalizado: false
        });
        this.savePessoaEmAndamentoToStorage(novaPessoa);
        return of(novaPessoa);
    }

    atualizarPessoaEmAndamento(dadosNovos: Partial<Pessoa>): Observable<Pessoa> {
        let pessoaEmAndamento = this.getPessoaEmAndamentoFromStorage();

        if (!pessoaEmAndamento) {
            pessoaEmAndamento = new Pessoa({
                ...dadosNovos,
                id: this.generateId(),
                cadastroFinalizado: false
            });
            this.savePessoaEmAndamentoToStorage(pessoaEmAndamento);
            return of(pessoaEmAndamento);
        }

        const pessoaAtualizadaFinal = { ...pessoaEmAndamento, ...dadosNovos };
        this.savePessoaEmAndamentoToStorage(pessoaAtualizadaFinal);
        return of(pessoaAtualizadaFinal);
    }

    excluirPessoaEmAndamento(): Observable<boolean> {
        const pessoaEmAndamento = this.getPessoaEmAndamentoFromStorage();
        if (pessoaEmAndamento) {
            this.savePessoaEmAndamentoToStorage(null);
            return of(true);
        }
        return of(false);
    }

    finalizarCadastroEmAndamento(): Observable<Pessoa | null> {
        const pessoaEmAndamento = this.getPessoaEmAndamentoFromStorage();
        if (!pessoaEmAndamento) {
            return throwError(() => new Error('Nenhuma pessoa em andamento para finalizar.'));
        }
        pessoaEmAndamento.cadastroFinalizado = true;
        const pessoas = [...this.getPessoasFromStorage(), pessoaEmAndamento];
        this.savePessoasToStorage(pessoas);
        this.savePessoaEmAndamentoToStorage(null);
        return of(pessoaEmAndamento);
    }

    private possuiPessoasInStorage(): boolean {
        return !!localStorage.getItem(this.storageKey);
    }

    private getPessoasFromStorage(): Pessoa[] {
        const pessoas = localStorage.getItem(this.storageKey);
        return pessoas ? JSON.parse(pessoas) : [];
    }

    private savePessoasToStorage(pessoas: Pessoa[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(pessoas));
    }

    private getPessoaEmAndamentoFromStorage(): Pessoa | null {
        const pessoa = localStorage.getItem(this.pessoaEmAndamentoKey);
        return pessoa ? JSON.parse(pessoa) : null;
    }

    private savePessoaEmAndamentoToStorage(pessoa: Pessoa | null): void {
        localStorage.setItem(this.pessoaEmAndamentoKey, JSON.stringify(pessoa));
    }

    private generateId(): number {
        const pessoas = this.getPessoasFromStorage();
        const pessoaEmAndamento = this.getPessoaEmAndamentoFromStorage();
        const ids = pessoas.map((p) => p.id);
        if (pessoaEmAndamento) {
            ids.push(pessoaEmAndamento.id);
        }
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }
}
