import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deletarToken, salvarToken } from '../../../../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'token';

  constructor(private store: Store<{ auth: any }>) {}

  salvarToken(token: string | null): void {
    if (token) this.store.dispatch(salvarToken(token));
  }

  deletarToken(): void {
    this.store.dispatch(deletarToken());
  }

  obterToken(): string | null {
    const tokenLocalStorage = localStorage.getItem(this.key);

    return tokenLocalStorage ?? null;
  }

  possuiToken(): boolean {
    return !!this.obterToken();
  }
}
