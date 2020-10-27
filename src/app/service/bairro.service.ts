import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BairroService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAll(cidadeSelecionada) {
    return this.httpClient.get<Bairro[]>('http://localhost:8090/bairros/' + cidadeSelecionada);
  }
}
