import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias } from '../models/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public readonly baseUrl: string = 'http://localhost:3000/categorias'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(this.baseUrl)
  }

  getId(id: number): Observable<Categorias> {
    return this.http.get<Categorias>(`${this.baseUrl}/${id}`)
  }

  post(obj: Categorias): Observable<Categorias> {
    return this.http.post<Categorias>(this.baseUrl,obj)
  }

  deleteId(id: number): Observable<Categorias> {
    return this.http.delete<Categorias>(`${this.baseUrl}/${id}`)
  }

  editar(obj: Categorias): Observable<Categorias> {
    return this.http.put<Categorias>(this.baseUrl + '/' + obj.id, obj)
  }
}
