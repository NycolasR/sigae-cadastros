export class Evento {
  id: number;
  nome: string;
  hora: string;
  local: string;
  data: Date;

  constructor(data: Partial<Evento>) {
    this.id = data.id!;
    this.nome = data.nome ?? '';
    this.hora = data.hora ?? '';
    this.local = data.local ?? '';
    this.data = data.data ?? new Date();
  }
}
