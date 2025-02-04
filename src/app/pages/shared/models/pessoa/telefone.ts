export class Telefone {
  id: number;
  numero: string;

  constructor(data: Partial<Telefone>) {
    this.id = data.id!;
    this.numero = data.numero!;
  }
}
