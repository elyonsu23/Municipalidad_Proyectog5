import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost/apiviernes/public/index.php';

  constructor(private http: HttpClient) { }

  alta(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, usuarioData);
  }

  recuperar(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  baja(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?userId=${userId}`);
  }
  
  // Nuevo método para modificar un usuario
  modificar(usuario: any, userId: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?userId=${userId}`,usuario)
  }
}

