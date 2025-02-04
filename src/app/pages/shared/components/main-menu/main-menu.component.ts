import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logout, salvarToken } from '../../../../store/auth.actions';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthState } from '../../../../store/auth.reducer';
import { TokenService } from './../../services/token/token.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [CommonModule, MenubarModule, ButtonModule],
  standalone: true,
})
export class MainMenuComponent implements OnInit, OnDestroy {
  isUsuarioLogado: boolean = false;
  items: MenuItem[] | undefined;
  authState$: Observable<any>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<{ auth: any }>,
    private readonly router: Router,
    private readonly tokenService: TokenService
  ) {
    this.authState$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.tokenService.salvarToken(localStorage.getItem('token'));

    this.authState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authState) => {
        this.isUsuarioLogado = !!authState.token;
        this.atualizarItems();
      });

    this.atualizarItems();
  }

  atualizarItems(): void {
    this.items = [
      {
        label: 'Sigae Lite',
        command: () => {
          this.router.navigate(['/inicio']);
        },
      },
    ];

    if (this.isUsuarioLogado) {
      this.items.push(
        {
          label: 'Pessoas',
          icon: 'pi pi-user',
          command: () => {
            this.router.navigate(['/pessoa']);
          },
        },
        {
          label: 'Agenda',
          icon: 'pi pi-calendar',
          command: () => {
            this.router.navigate(['/agenda']);
          },
        },
        {
          label: 'Plano de Ação',
          icon: 'pi pi-copy',
          command: () => {
            this.router.navigate(['/plano-de-acao']);
          },
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  alternarEstadoAutenticacao() {
    if (this.isUsuarioLogado) {
      this.store.dispatch(logout());
      this.isUsuarioLogado = false;
      this.atualizarItems();
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
