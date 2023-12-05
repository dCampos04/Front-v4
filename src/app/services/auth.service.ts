import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Agrega la importación de 'map'
import { of } from 'rxjs';
import { Teacher} from "../Modelo/Teacher";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';
  //const base_url1=['https://3.143.233.119/api/auth'];

  constructor(private httpClient: HttpClient) { }

  register(teacher:Teacher): Observable<Teacher> {
    const url = `${this.baseUrl}/register`;
    return this.httpClient.post<Teacher>(url, teacher);
  }

  authenticate(credentials?: any): Observable<any> {
    if (credentials) {
      const url = `${this.baseUrl}/authenticate`;
      return this.httpClient.post<any>(url, credentials)
        .pipe(
          map(response => {
            return response; // Devuelve la respuesta completa, incluido el id
          })
        );
    } else {
      const token = localStorage.getItem('token');
      return of({ token }); // Devuelve un objeto con la propiedad 'token'
    }

  }


  isAuthenticated(): boolean {
    // Lógica para verificar la autenticación, por ejemplo, verificar la existencia del token en localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }

  getCurrentTeacherId(): number | null {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));

      return tokenData.teacherId;
    }

    return null;
  }




  // forgotPassword(email: string): Observable<any> {
  //   return this.httpClient.post<any>(base_url+'/forgot-password', { email });
  // }

  // resetPassword(newPassword: string, token: string): Observable<any> {
  //   return this.httpClient .patch<any>(base_url+'/reset-password', { newPassword, token });
  // }
}
