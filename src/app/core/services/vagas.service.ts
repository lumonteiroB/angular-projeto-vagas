import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vagas } from '../models/vagas/vagas';

@Injectable({
  providedIn: 'root'
})
export class VagasService {

  public readonly baseUrl: string = 'http://localhost:3000/vagas'

  constructor(
    private http: HttpClient
  ) { }

  // Get all VAGAS ***
  getAll(url: string): Observable<Vagas[]> {
    if( url.length > 0 ){
      return this.http.get<Vagas[]>(`${this.baseUrl}${url}`)
    } else {
      return this.http.get<Vagas[]>(this.baseUrl)
    }
  }

  getId(id: number): Observable<Vagas> {
    return this.http.get<Vagas>(`${this.baseUrl}/${id}`)
  }

  deleteId(id: number): Observable<Vagas> {
    return this.http.delete<Vagas>(`${this.baseUrl}/${id}`)
  }

  post(obj: Vagas): Observable<Vagas> {
    return this.http.post<Vagas>(this.baseUrl,obj)
  }

  editar(obj: Vagas): Observable<Vagas> {
    return this.http.put<Vagas>(this.baseUrl + '/' + obj.id, obj)
  }
}
