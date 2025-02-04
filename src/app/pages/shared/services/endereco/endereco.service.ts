import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Estado } from '../../models/endereco/estado';
import { Municipio } from '../../models/endereco/municipio';
import { Cep } from '../../models/endereco/cep';
import { Pais } from '../../models/endereco/pais';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiEstados =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private apiMunicipios =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private apiCep = 'https://viacep.com.br/ws';
  private apiPaises = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  consultarEstados(): Observable<Estado[]> {
    return this.http
      .get<Estado[]>(`${this.apiEstados}`)
      .pipe(
        map((estados) => estados.sort((a, b) => a.nome.localeCompare(b.nome)))
      );
  }

  buscarEstadoPorNome(nomeEstado: string): Observable<Estado | null> {
    return this.http
      .get<Estado[]>(this.apiEstados)
      .pipe(
        map(
          (estados) =>
            estados.find(
              (estado) => estado.nome.toLowerCase() === nomeEstado.toLowerCase()
            ) || null
        )
      );
  }

  consultarMunicipios(estadoId: number): Observable<Municipio[]> {
    return this.http
      .get<Municipio[]>(`${this.apiMunicipios}/${estadoId}/municipios`)
      .pipe(
        map((municipios) =>
          municipios.sort((a, b) => a.nome.localeCompare(b.nome))
        )
      );
  }

  consultarCep(cep: string): Observable<Cep> {
    return this.http.get<Cep>(`${this.apiCep}/${cep}/json`);
  }

  consultarPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiPaises).pipe(
      map((paises) =>
        paises.sort((a, b) => {
          const nameA = a.name.common || '';
          const nameB = b.name.common || '';
          return nameA.localeCompare(nameB);
        })
      )
    );
  }
}
