import { Component, OnInit} from '@angular/core';
import { QuestionService } from "../../service/question.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {StoriesService} from "../../services/stories.service";
import {StoryDTO} from "../../Modelo/StoryDTO";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-body-historial',
  templateUrl: './body-historial.component.html',
  styleUrls: ['./body-historial.component.css']
})
export class BodyHistorialComponent implements OnInit {

  private instance: any;
  stories: StoryDTO[] = [];



  constructor(private questionService: QuestionService, private sanitizer: DomSanitizer, private storiesService: StoriesService, private authService:AuthService) {
  }

  ngOnInit() {

    // Obtener el ID del profesor desde el servicio de autenticación
    const teacherId = this.authService.getCurrentTeacherId();
    console.log('id del docente:', teacherId);
    if (teacherId !== null) {
      // Llamar al servicio para obtener las historias del profesor

      this.storiesService.getStoriesByTeacherId(teacherId).subscribe(
        (stories) => {
          console.log('Historias obtenidas exitosamente:', stories);

          // Asigna los datos al arreglo 'stories'
          this.stories = stories;
        },
        (error) => {
          console.error('Error al obtener historias:', error);
          // Manejar el error según tus necesidades
        }
      );

    } else {
      console.error('No se pudo obtener el ID del profesor.');
      // Manejar el error según tus necesidades
    }
  }




  onFiltroChange(event: any) {
    const filtroSeleccionado = event.target.value;

    if (filtroSeleccionado === 'Alfabeticamente') {
      // Ordenar alfabéticamente por el título de la historia
      this.stories.sort((a: any, b: any) => a.title.localeCompare(b.title));
    } else if (filtroSeleccionado === 'Mas recientes') {
      // Aquí puedes implementar la lógica para ordenar por la fecha más reciente si es necesario
      // Por ejemplo, podrías tener una propiedad de fecha en tus objetos 'libro'
      // y ordenar en consecuencia.
    } else {
      // Si se selecciona "Seleccionar filtro" o cualquier otro caso, restaurar la lista a su estado original
      this.ngOnInit();
    }
  }

}
