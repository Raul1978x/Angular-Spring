import { Injectable } from '@angular/core';
import { CLIENTES } from './cliente.json'
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  HttpHeaders: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private Http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    // return of (CLIENTES);
    return this.Http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.Http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.HttpHeaders })
  }
  
  getCliente(id: number): Observable<Cliente> {
    return this.Http.get<Cliente>(`$(this.urlEndPoint)/${id}`)
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.Http.put<Cliente>(`$(this.urlEndPoint)/${cliente.id}`, cliente, {headers: this.HttpHeaders});
  }

  delete(id: number): Observable<Cliente> {
    return this.Http.delete<Cliente>(`${this.urlEndPoint})/${id}`, { headers: this.HttpHeaders });
  }
}
