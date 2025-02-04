import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { Pessoa } from '../../models/pessoa/pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private storageKey = 'pessoas';
  private pessoaEmAndamentoKey = 'pessoaEmAndamento';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.pessoaEmAndamentoKey)) {
      localStorage.setItem(this.pessoaEmAndamentoKey, JSON.stringify(null));
    }
  }

  listarPessoasCadastradas(): Observable<Pessoa[]> {
    const pessoas =
      this.getPessoasFromStorage()?.filter((p) => p.cadastroFinalizado) || [];
    return of(pessoas);
  }

  buscarPorId(id: number): Observable<Pessoa | undefined> {
    const pessoa = this.getPessoasFromStorage().find(
      (p) => p.id === id && p.cadastroFinalizado
    );
    return of(pessoa);
  }

  atualizar(
    id: number,
    dadosNovos: Partial<Pessoa>
  ): Observable<Pessoa | undefined> {
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
        cadastroFinalizado: false,
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
      cadastroFinalizado: false,
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
        cadastroFinalizado: false,
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
      return throwError(
        () => new Error('Nenhuma pessoa em andamento para finalizar.')
      );
    }
    pessoaEmAndamento.cadastroFinalizado = true;
    const pessoas = [...this.getPessoasFromStorage(), pessoaEmAndamento];
    this.savePessoasToStorage(pessoas);
    this.savePessoaEmAndamentoToStorage(null);
    return of(pessoaEmAndamento);
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
