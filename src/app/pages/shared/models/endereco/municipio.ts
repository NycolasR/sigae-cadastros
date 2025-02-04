import { Estado } from './estado';

export class Municipio {
  id: number;
  nome: string;
  estado?: Estado;

  constructor(data: Partial<Municipio>) {
    this.id = data.id!;
    this.nome = data.nome!;
    this.estado = data.estado;
  }
}
