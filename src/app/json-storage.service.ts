import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonStorageService {
  private jsonData: string="";

  setJsonData(data: string) {
    this.jsonData = data;
  }

  getJsonData(): string {
    return this.jsonData;
  }

  // Agrega un método para obtener la imagen a partir de la cadena JSON guardada
  getImageFromJson(): string {
    // Analiza la cadena JSON y obtén la URL base64 de la imagen
    const parsedData = JSON.parse(this.jsonData);
    return parsedData.imageDataURL; // Asegúrate de adaptar esto a tu estructura de datos.
  }
}
