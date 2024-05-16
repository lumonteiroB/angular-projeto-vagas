import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConteudoSite } from '../models/conteudo-site';

@Injectable({
  providedIn: 'root'
})
export class ConteudoSiteService {
  public readonly baseUrl: string = 'http://localhost:3000/conteudoSite'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ConteudoSite> {
    return this.http.get<ConteudoSite>(this.baseUrl)
  }

  deleteId(id: number): Observable<ConteudoSite> {
    return this.http.delete<ConteudoSite>(`${this.baseUrl}/${id}`)
  }
}
