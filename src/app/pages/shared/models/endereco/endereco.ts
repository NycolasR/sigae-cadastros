import { Estado } from './estado';
import { Municipio } from './municipio';
import { Pais } from './pais';

export class Endereco {
  id: number;
  enderecoCompleto: string;
  cep?: string;
  estado: Estado;
  municipio: Municipio | string;
  pais: Pais;

  constructor(data: Partial<Endereco>) {
    this.id = data.id!;
    this.enderecoCompleto = data.enderecoCompleto || '';
    this.cep = data.cep;
    this.estado = data.estado!;
    this.municipio = data.municipio!;
    this.pais = data.pais!;
  }
}
