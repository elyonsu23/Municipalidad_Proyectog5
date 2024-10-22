import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // URL base de la API en el backend
  private apiUrl = 'http://localhost/apiviernes/public/index.php';

  constructor(private http: HttpClient) { }

  private getToken(): string | null{
    return localStorage.getItem('token')
  }

   private createHeaders(){
    const token = this.getToken()
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type' : 'application/json'
      });
    }else{
      return new HttpHeaders({
         'Content-Type' : 'application/json'
      })
    }   }

  // Método para crear un nuevo usuario en la base de datos (POST)
  alta(usuarioData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=users`, usuarioData, {headers});
  }

  // Método para recuperar todos los usuarios desde la base de datos (GET)
  recuperarUsuarios(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=users`, {headers});
  }

  // Método para eliminar un usuario de la base de datos (DELETE)
  baja(userId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrl}?entity=users&id=${userId}`,{headers});
  }

  // Método para modificar un usuario existente en la base de datos (PUT)
  modificar(usuario: any, userId: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.apiUrl}?entity=users&id=${userId}`, usuario, {headers});
  }

  // Nuevo método para iniciar sesión
  login(credentials: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=login`, credentials, {headers});
  }
   
  // Método para crear un nuevo grupo (POST)
  altaGrupo(grupoData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=groups`, grupoData, {headers});
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarGrupos(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=groups`);
  }

  // Método para eliminar un grupo de la base de datos (DELETE)
  bajaGrupo(idGrupo: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrl}?entity=groups&id=${idGrupo}`, {headers});
  }

  // Método para modificar un grupo existente en la base de datos (PUT)
  modificarGrupo(grupo: any, idGrupo: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.apiUrl}?entity=groups&id=${idGrupo}`, grupo, {headers});
  }
}
