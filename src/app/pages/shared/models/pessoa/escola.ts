export class Escola {
  id: number;
  nome: string;

  constructor(data: Partial<Escola>) {
    this.id = data.id!;
    this.nome = data.nome!;
  }
}
