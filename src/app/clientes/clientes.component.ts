import { Component, OnInit } from '@angular/core';
import { Cliente, Usuario } from './cliente';
import { ClienteService } from '../service/cliente.service';
import swal from "sweetalert2/dist/sweetalert2.js";
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listadoCl: Cliente[];
  pagina: string;
  paginacion: any;
  busquedaUsuario: string;
  usuarios: Usuario;
  listadoUsuarios: Usuario[];



  constructor(private clienteService: ClienteService,    
    private usuarioService: UsuariosService,
    private rutas: Router,
    private activateRoute: ActivatedRoute) {
      this.pagina='0';
      this.busquedaUsuario = '';
      this.usuarios = new Usuario();
  }

  ngOnInit(): void {
    // this.activateRoute.params.subscribe(rutaUrl => {
    //   this.pagina= rutaUrl['page'];
    //   console.log("pagina",this.pagina);      
    //   if (this.pagina == null || this.pagina == undefined || this.pagina == '') {
    //     this.pagina = '0';
    //   }
    //   this.traerClientes(this.pagina);
    // });
  }


  traerClientes(pagina: string): void {
    this.clienteService.getClientes(pagina).subscribe(
      (clienteService) => {
        console.log("resultado->",clienteService);
        this.paginacion = clienteService;
        
        this.listadoCl = clienteService['cliente'];
        console.log("datos de clientes", this.listadoCl);
      }
    );

  }

  buscarUsuario(): void{
    console.log("busqueda cliente",this.busquedaUsuario);
    this.usuarios.nombre=this.busquedaUsuario;
    this.usuarioService.getUsuarios(this.usuarios).subscribe(
      (response) => {
        this.listadoUsuarios = response;
        console.log("resultado->",this.listadoUsuarios);               
        
      }
    );
    

  }



  eliminarUsuario(usu: Usuario): void {
    swal.fire({
      title: 'Eliminar Usuario',
      text: "Esta seguro de eliminar a: " + usu.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#adb5bd',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i>'
    }).then((result) => {
      if (result.value) {
        this.borrarUsuario(usu);
        return;
      }
    })

  }

  borrarUsuario(usua: Usuario): void {
    this.usuarioService.eliminarUsuario(usua)
      .subscribe(
        response => {
          console.log("respuesta despues de eliminar", response);

          swal.fire(
            'Cliente borrado con éxito!',
            'El cliente ' + usua.nombre + ' fue borrador.',
            'success'
          );

          this.buscarUsuario();

        }
      );
  }

  limpiar(): void{
    this.busquedaUsuario = '';
  }

}
