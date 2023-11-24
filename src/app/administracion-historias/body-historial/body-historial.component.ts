import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { QuestionService } from "../../service/question.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-body-historial',
  templateUrl: './body-historial.component.html',
  styleUrls: ['./body-historial.component.css']
})
export class BodyHistorialComponent implements OnInit, AfterViewInit {

  public librosList: any = [];
  private instance: any;


  ngAfterViewInit() {

  }

  constructor(private questionService: QuestionService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getLibrosData();
  }

  getLibrosData() {
    this.questionService.getLibrosJson()
      .subscribe(res => {
        if (res && res.libros) {
          this.librosList = res.libros;
        } else {
          // La respuesta no tiene el formato esperado
          console.error('Formato de respuesta no válido:', res);
        }
      });
  }


  onFiltroChange(event: any) {
    const filtroSeleccionado = event.target.value;

    if (filtroSeleccionado === 'Alfabeticamente') {
      // Ordenar alfabéticamente por el título de la historia
      this.librosList.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));
    } else if (filtroSeleccionado === 'Mas recientes') {
      // Aquí puedes implementar la lógica para ordenar por la fecha más reciente si es necesario
      // Por ejemplo, podrías tener una propiedad de fecha en tus objetos 'libro'
      // y ordenar en consecuencia.
    } else {
      // Si se selecciona "Seleccionar filtro" o cualquier otro caso, restaurar la lista a su estado original
      this.getLibrosData();
    }
  }

}
