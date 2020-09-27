import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clientes/cliente';
import { Router, ActivatedRoute } from '@angular/router';

import swal from "sweetalert2";
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  rol: any = {};
  usuario: Usuario;
  titulo: string = 'Crear Clientes';
 
  btnNombre: string = 'Crear';
  erroresBack: string[] = [];
  maxDate: Date = new Date();

  constructor(private usuarioService: UsuariosService,
    private rutas: Router,
    private activateRoute: ActivatedRoute) {
    // this.rol = {
    //   "1": "ADMINISTRADOR",
    //   "2": "AUDITOR",
    //   "3": "AUXILIAR"
    // };
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    console.log(this.rol);
    this.cargarUsuario();

  }

  capturarRolSelect(): void {
    console.log("valor seleccionado", this.usuario);

  }


  crearusuario(): void {
    
    // if(this.usuario.idUsuario){ /**actualizar cliente */   
    //   this.actualizarCliente(this.cliente);
    //   return;      
    // }

    this.usuarioService.crearUsuario(this.usuario).subscribe(
      response => {
        console.log("respuesta del servicio de creado de cliente", response);
        swal('Cliente creado!', 'El cliente ' + response.nombre + ' creado con éxito!', 'success');
        //despues de guardar, redirigimos al listado de clientes
        this.rutas.navigate(['/clientes']);
      },
      error => {
        
        if(error.status == 400){ // si el error proviene de un BAD_REQUEST desde el back, es porque son validaciones de campos
          console.log("error de campos", error);
          this.erroresBack = error.error.resultado;
          
          return;

        }





        console.log(error);        
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        return;
      }

    );
  }

  /**verifica segun la URL el id del cliente que se va a mandar a llamar
   * al endPoint
   */
  cargarUsuario(): void {
    this.activateRoute.params.subscribe(parametrosUrl => {
      let id: string = parametrosUrl['id'];
      if (id) { //si el ID existe
        this.traerUsuarioPorId(id);
      }

    }
    );
  }

  /**trae el cliente directamente del endPoint*/
  traerUsuarioPorId(id: string): void {
    this.usuarioService.traerUsuarioPorId(id).subscribe(
      response => {
        console.log("usuario encontrado->", response);
        this.usuario = response;
      },
      error => {
        console.log(error);        
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        this.rutas.navigate(["/clientes"]);
      });

  }

}
