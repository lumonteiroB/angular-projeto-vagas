import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespostasQuestionario } from '../models/respostas-questionario';

@Injectable({
  providedIn: 'root'
})
export class RespostaQuestService {

  public readonly baseUrl: string = 'http://localhost:3000/respostasQuestionario'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<RespostasQuestionario[]> {
    return this.http.get<RespostasQuestionario[]>(`${this.baseUrl}`)
  }

  postResp(respQuest: RespostasQuestionario): Observable<RespostasQuestionario> {
    return this.http.post<RespostasQuestionario>(this.baseUrl, respQuest)
  }

  deleteId(id: number): Observable<RespostasQuestionario> {
    return this.http.delete<RespostasQuestionario>(`${this.baseUrl}/${id}`)
  }

  getId(id: number): Observable<RespostasQuestionario>{
    return this.http.get<RespostasQuestionario>(`${this.baseUrl}/${id}`)
  }

  editar(obj: RespostasQuestionario): Observable<RespostasQuestionario> {
    return this.http.put<RespostasQuestionario>(this.baseUrl + '/' + obj.id, obj)
  }
}
