import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../model/Tarea';
import { ResponseDTO } from '../model/responseDto';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  urlBase: string = 'http://localhost:8080/v1/api'

  constructor(private httpClient: HttpClient) { }

  obtenerListaTareas(): Observable<Tarea[]> {
    return this.httpClient.get<Tarea[]>(this.urlBase + "/tasks");
  }

  crearTarea(tarea: Tarea): Observable<ResponseDTO> {
    return this.httpClient.post<ResponseDTO>(this.urlBase + "/task", tarea);
  }

  eliminarTarea(id: number): Observable<ResponseDTO> {
    return this.httpClient.delete<ResponseDTO>(this.urlBase + `/task/${id}`)
  }
}
