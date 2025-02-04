export class Etapa {
  id: number;
  descricao: string;

  constructor(data: Partial<Etapa>) {
    this.id = data.id!;
    this.descricao = data.descricao!;
  }
}
