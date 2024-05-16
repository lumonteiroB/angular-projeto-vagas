import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public readonly baseUrl: string = 'http://localhost:3000/usuarios'

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.baseUrl}/${id}`)
  }

  getUsername(username: string): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.baseUrl}/?username=${username}`)
  }

  getAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.baseUrl}`)
  }

  postUser(user: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.baseUrl, user)
  }

  public logout() {
    localStorage.removeItem('acessUser');
  }

  getId(id: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.baseUrl}/${id}`)
  }

  delete(id: number): Observable<Usuarios> {
    return this.http.delete<Usuarios>(`${this.baseUrl}/${id}`)
  }

  post(obj: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.baseUrl,obj)
  }

  editar(obj: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(this.baseUrl + '/' + obj.id, obj)
  }

  public isAuthenticated(): boolean {
    const usuarioAdm = JSON.parse(localStorage.getItem('acessUser') as string)
    if (usuarioAdm) {
      if (usuarioAdm.tipo === 'admin') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
