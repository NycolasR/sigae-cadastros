import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evento } from '../../models/agenda/evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private readonly STORAGE_KEY = 'eventos';
  private eventosSubject: BehaviorSubject<Evento[]>;

  constructor() {
    const eventosIniciais = this.carregarEventosMockados();
    this.eventosSubject = new BehaviorSubject<Evento[]>(eventosIniciais);
  }

  private carregarEventosMockados(): Evento[] {
    const eventosMockados: Evento[] = [
      new Evento({
        id: 1,
        nome: 'Workshop de React',
        hora: '08:00',
        local: 'Auditório Central',
        data: new Date(2024, 10, 18),
      }),
      new Evento({
        id: 1,
        nome: 'Palestra Inovadores',
        hora: '15:00',
        local: 'Auditório Central',
        data: new Date(2024, 10, 18),
      }),
      new Evento({
        id: 1,
        nome: 'Workshop de Angular',
        hora: '10:00',
        local: 'Auditório Central',
        data: new Date(2024, 10, 20),
      }),
      new Evento({
        id: 2,
        nome: 'Reunião de Equipe',
        hora: '11:30',
        local: 'Sala de Conferências',
        data: new Date(2024, 10, 20),
      }),
      new Evento({
        id: 3,
        nome: 'Treinamento de Segurança',
        hora: '15:00',
        local: 'Sala 202',
        data: new Date(2024, 10, 20),
      }),
      new Evento({
        id: 4,
        nome: 'Reunião de Planejamento',
        hora: '14:00',
        local: 'Sala de Conferências',
        data: new Date(2024, 10, 25),
      }),
      new Evento({
        id: 5,
        nome: 'Apresentação do Projeto X',
        hora: '16:00',
        local: 'Auditório Central',
        data: new Date(2024, 10, 25),
      }),

      new Evento({
        id: 6,
        nome: 'Festival de Tecnologia',
        hora: '09:00',
        local: 'Centro de Convenções',
        data: new Date(2024, 11, 5),
      }),
      new Evento({
        id: 7,
        nome: 'Mesa Redonda: Inovação',
        hora: '11:00',
        local: 'Sala Multiuso',
        data: new Date(2024, 11, 5),
      }),
      new Evento({
        id: 8,
        nome: 'Apresentação de Projetos',
        hora: '13:30',
        local: 'Sala Multiuso',
        data: new Date(2024, 11, 12),
      }),
      new Evento({
        id: 9,
        nome: 'Palestra sobre IA',
        hora: '15:30',
        local: 'Sala Multiuso',
        data: new Date(2024, 11, 12),
      }),
      new Evento({
        id: 10,
        nome: 'Hackathon de Fim de Ano',
        hora: '09:00',
        local: 'Centro de Eventos',
        data: new Date(2024, 11, 22),
      }),
      new Evento({
        id: 11,
        nome: 'Festa de Final de Ano',
        hora: '18:00',
        local: 'Área de Eventos',
        data: new Date(2024, 11, 22),
      }),
      new Evento({
        id: 12,
        nome: 'Feira de Empreendedores',
        hora: '10:00',
        local: 'Praça Central',
        data: new Date(2024, 11, 22),
      }),
    ];

    const eventosSalvos = this.obterEventosDoLocalStorage();
    if (eventosSalvos.length > 0) {
      return eventosSalvos;
    } else {
      this.salvarEventosNoLocalStorage(eventosMockados);
      return eventosMockados;
    }
  }

  private salvarEventosNoLocalStorage(eventos: Evento[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(eventos));
  }

  private obterEventosDoLocalStorage(): Evento[] {
    const eventosString = localStorage.getItem(this.STORAGE_KEY);
    if (eventosString) {
      const eventosJson = JSON.parse(eventosString);
      return eventosJson.map((evento: any) => {
        return new Evento({
          ...evento,
          data: new Date(evento.data),
        });
      });
    }
    return [];
  }

  getEventos(): Observable<Evento[]> {
    return this.eventosSubject.asObservable();
  }

  adicionarEvento(evento: Evento): void {
    const eventos = this.eventosSubject.getValue();
    const novosEventos = [...eventos, evento];
    this.salvarEventosNoLocalStorage(novosEventos);
    this.eventosSubject.next(novosEventos);
  }

  filtrarEventosPorDia(data: Date): Observable<Evento[]> {
    const eventosFiltrados = this.eventosSubject
      .getValue()
      .filter((evento) => evento.data.toDateString() === data.toDateString());
    return new BehaviorSubject(eventosFiltrados).asObservable();
  }
}
