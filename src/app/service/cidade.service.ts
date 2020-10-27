import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CidadeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAll() {
    return this.httpClient.get<Cidade[]>('http://localhost:8090/cidades');
  }
}
