import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  public readonly baseUrl: string = 'http://localhost:3000/empresa'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl)
  }

  getId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/${id}`)
  }

  deleteId(id: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${this.baseUrl}/${id}`)
  }

  post(obj: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.baseUrl,obj)
  }

  editar(obj: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(this.baseUrl + '/' + obj.id, obj)
  }
  
}
