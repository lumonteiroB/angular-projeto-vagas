import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FazerLogin } from '../models/fazer-login';

@Injectable({
  providedIn: 'root'
})
export class FazerLoginService {
  
  public readonly baseUrl: string = 'http://localhost:3000/fazerLogin'

  constructor(
    private http: HttpClient
  ) { }

  getLogin(payload: { user: string; senha: string }): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}/?username=${payload.user}&senha=${payload.senha}`)
  }

  getId(id: number): Observable<FazerLogin>{
    return this.http.get<FazerLogin>(`${this.baseUrl}/${id}`)
  }

  postLogin(login: FazerLogin): Observable<FazerLogin> {
    return this.http.post<FazerLogin>(this.baseUrl, login)
  }

  getAll():Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(this.baseUrl)
  }

  deleteId(id: number): Observable<FazerLogin> {
    return this.http.delete<FazerLogin>(`${this.baseUrl}/${id}`)
  }

  editar(obj: FazerLogin): Observable<FazerLogin> {
    return this.http.put<FazerLogin>(this.baseUrl + '/' + obj.id, obj)
  }
}
