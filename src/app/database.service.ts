import { Injectable } from '@angular/core';  // Importa el decorador Injectable para hacer que el servicio sea inyectable
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs';  // Importa Observable para manejar las respuestas asincrónicas

@Injectable({
  providedIn: 'root'  // Indica que este servicio estará disponible de manera global en la aplicación
})
export class DatabaseService {
  
  // URL base de la API en el backend
  private apiUrl = 'http://localhost/apiviernes/public/index.php'; 

  constructor(private http: HttpClient) { }  // Inyecta HttpClient para usarlo en las peticiones

  // Método para crear un nuevo usuario en la base de datos (POST)
  alta(usuarioData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiviernes/public/index.php/users'
    // con los datos del usuario en el cuerpo de la solicitud
    return this.http.post(`${this.apiUrl}/users`, usuarioData);
  }

  // Método para recuperar todos los usuarios desde la base de datos (GET)
  recuperarUsuarios(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiviernes/public/index.php/users'
    // para obtener la lista de usuarios
    return this.http.get(`${this.apiUrl}/users`);
  }
  
  

  // Método para eliminar un usuario de la base de datos (DELETE)
  baja(userId: number): Observable<any> {
    // Envía una solicitud DELETE a la URL 'http://localhost/apiviernes/public/index.php/users'
    // pasando el userId como un parámetro en la URL
    return this.http.delete(`${this.apiUrl}/users?userId=${userId}`);
  }
  
  // Método para modificar un usuario existente en la base de datos (PUT)
  modificar(usuario: any, userId: any): Observable<any> {
    // Envía una solicitud PUT a la URL 'http://localhost/apiviernes/public/index.php/users'
    // pasando el userId como parámetro en la URL, y los datos del usuario en el cuerpo de la solicitud
    return this.http.put(`${this.apiUrl}/users?userId=${userId}`, usuario);
  }

  // Método para crear un nuevo grupo (POST)
  altaGrupo(grupoData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiviernes/public/index.php/groups'
    // con los datos del grupo en el cuerpo de la solicitud
    return this.http.post(`${this.apiUrl}/groups`, grupoData);
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarGrupos(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiviernes/public/index.php/groups'
    // para obtener la lista de grupos
    return this.http.get(`${this.apiUrl}/groups`);
  }

  // Método para eliminar un grupo de la base de datos (DELETE)
  bajaGrupo(idGrupo: number): Observable<any> {
    // Envía una solicitud DELETE a la URL 'http://localhost/apiviernes/public/index.php/groups'
    // pasando el idGrupo como parámetro en la URL
    return this.http.delete(`${this.apiUrl}/groups?idGrupo=${idGrupo}`);
  }

  // Método para modificar un grupo existente en la base de datos (PUT)
  modificarGrupo(grupo: any, idGrupo: any): Observable<any> {
    // Envía una solicitud PUT a la URL 'http://localhost/apiviernes/public/index.php/groups'
    // pasando el groupId como parámetro en la URL, y los datos del grupo en el cuerpo de la solicitud
    return this.http.put(`${this.apiUrl}/groups?idGrupo=${idGrupo}`, grupo);
  }
}
