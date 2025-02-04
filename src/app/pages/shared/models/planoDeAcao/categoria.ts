export class Categoria {
  id: number;
  descricao: string;

  constructor(data: Partial<Categoria>) {
    this.id = data.id!;
    this.descricao = data.descricao!;
  }
}
