import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest,HttpEvent   } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { Region } from '../models/region.model';
import { Cliente } from '../models/cliente.model';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }


  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`);
  }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlEndPoint}`);
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        //this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers:this.httpHeaders})
                .pipe(
                  catchError(e=>{
                    if(e.status==400){
                      return throwError(e);
                    }
                    console.log(e.error.mensaje);
                    return throwError(e);
                  })
                );
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders})
          .pipe(
            catchError(e => {

              if (e.status == 400) {
                return throwError(e);
              }
      
              console.error(e.error.mensaje);
              return throwError(e);
            })
          );
  }

  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
      .pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }




}
