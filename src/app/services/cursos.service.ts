import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  url = 'http://localhost:3000/cursos';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCursos(): Observable<Cursos[]> {
    return this.httpClient.get<Cursos[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getCursosById(id: number): Observable<Cursos> {
    return this.httpClient.get<Cursos>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveCursos(cursos: Cursos): Observable<Cursos> {
    return this.httpClient.post<Cursos>(this.url, JSON.stringify(cursos), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateCursos(cursos: Cursos): Observable<Cursos> {
    return this.httpClient.put<Cursos>(this.url + '/' + cursos.id, JSON.stringify(cursos), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteCursos(cursos: Cursos) {
    return this.httpClient.delete<Cursos>(this.url + '/' + cursos.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
