export class Cliente {
    id: string;
    nombre: string;
    apellido: string;
    edad: string;
    fechaNacimiento: string;
    email: string;
    fechaCreacion: string;
    rutaFoto: string;
}

export class Usuario {
    idUsuario: string;
    nombre: string;
    activo: string;
    idRol: string;
    nombreRol: string;
    nombreActivo: string;
   
}

export class Rol {
    idRol: string;
    nombre: string;
   
}
