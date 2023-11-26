import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const basic_url=['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestionJson() {
    return this.http.get<any>('assets/questions.json');
  }

  getResultadosJson() {
    return this.http.get<any>('assets/resultados.json');
  }

  getLibrosJson() {
    return this.http.get<any>('assets/libros.json')
      .pipe(
        map(res => {
          if (res && res.libros) {
            // Agregar la propiedad portadaUrl a cada libro
            res.libros.forEach((libro: any) => {
              libro.portadaUrl = this.convertirBase64ToUrl(libro.portada);
            });
          }
          return res;
        })
      );
  }

  getTitautJson() {
    return this.http.get<any>('assets/titaut.json');
  }

  private convertirBase64ToUrl(base64String: string): string {
    // Convertir cadena base64 a URL de datos
    return base64String;
  }
}
