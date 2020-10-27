import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAll() {
    return this.httpClient.get<Estado[]>('http://localhost:8090/estados');
  }
}
