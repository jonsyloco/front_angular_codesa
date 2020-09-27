import { Injectable } from '@angular/core';

import { formatDate} from "@angular/common";
import { Cliente, Usuario } from '../clientes/cliente';
import { Observable, of, throwError } from "rxjs"; //throwError no sirve para capturar las excepciones generadas por el  status HTTP
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, catchError } from "rxjs/operators"; //catchError, es para obtener los errores y el status HTTP

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlEndpoint: string = 'http://localhost:8080/api/';
  httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) {

  }

  getUsuarios(usuario: Usuario): Observable<any> {    

    return this.http.post<any>(this.urlEndpoint + 'usuarios/',  usuario, {headers: this.httpHeaders}).pipe(
      map((dato: any) => {   
        console.log("respuesta del servicio",dato);
             
        let usuario = dato as Usuario[];        

          usuario.map(valor => {
          console.log("nombre_usuario", valor.nombre);
          valor.nombre = valor.nombre.toUpperCase();                    
          
          if(valor.idRol == '1'){
            valor.nombreRol = 'ADMINISTRADOR';
          }
          
          if(valor.idRol == '2'){
            valor.nombreRol = 'AUDITOR';
          }
          
          if(valor.idRol == '3'){
            valor.nombreRol = 'AUXILIAR';
          }
          
          if(valor.activo == '1'){
            valor.nombreActivo = 'ACTIVO';
          }else{
            valor.nombreActivo = 'INACTIVO';

          }

          

          return valor;
        });      
        
        return usuario;

      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    )
  }

  crearUsuario(usario: Usuario): Observable<any>{
    return this.http.post<any>(this.urlEndpoint + 'guardarUsuario/', usario, { headers: this.httpHeaders }).pipe(
      map((data: any) => {    
        console.log("despues de crear", data);    
        let cliente = data.resultado as Usuario;
        return cliente;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    )
  }

  traerUsuarioPorId(id: String): Observable<any>{
    return this.http.get<any>(this.urlEndpoint + 'buscarUsuario/'+ id).pipe(
      map((data: any) => {    
        console.log("buscando", data);    
        let usuario = data as Usuario;
        return usuario;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    )
  }

  eliminarUsuario(usuario: Usuario): Observable<any>{
    return this.http.delete(this.urlEndpoint+ 'eliminarUsuario/'+ usuario.idUsuario,{headers: this.httpHeaders})
    .pipe(
      map(data =>{
        // let cliente = data as Cliente;

        return data;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    );
  }
}
