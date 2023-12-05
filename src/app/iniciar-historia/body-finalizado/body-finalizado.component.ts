import { Component , OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {StudentDetails} from "../../Modelo/studentDetails";
import {SharedService} from "../../services/shared.service";
import { StoriesService } from "../../services/stories.service";
import {Router} from "@angular/router";
import {StudentListRes} from "../../Modelo/StudentListRes";
import { WordsConts} from "../../Modelo/WordsConts";


@Component({
  selector: 'app-body-finalizado',
  templateUrl: './body-finalizado.component.html',
  styleUrls: ['./body-finalizado.component.css']
})
export class BodyFinalizadoComponent implements OnInit  {

  public resultadosList: any = [];
  public students:StudentDetails;
  public storyId:number|undefined=0;


  constructor(private questionService: QuestionService, private sharedService:SharedService
  ,  private storiesService: StoriesService, private router:Router) {}

  consultedWords: { palabra: string, consultCount: number }[] = [];

  listaparausar:WordsConts[]=[];

  lista:string[]=[];

  ngOnInit(): void {
    this.getAllQuestions();
    this.students=this.sharedService.getStudentDetails()
    this.storyId = this.sharedService.getActivityId()
    console.log("detalles en lista:",this.students)
    console.log("id de la historia", this.storyId)

    const lista = this.students.students;
    const studentsData: any[] = []; // Aquí almacenaremos la nueva estructura

    for (let i = 0; i < lista.length; i++) {
      const contenidoTransformadoB64 = lista[i].consultedWord;
      const contenidoDecodificado = this.deCodifB64(contenidoTransformadoB64);

      console.log('Contenido decodificado en ngOnInit:', contenidoDecodificado);

      // Reemplazar la propiedad 'consultedWord' con su versión decodificada
      lista[i].consultedWord = contenidoDecodificado;

      // Agregar el objeto modificado a la nueva lista
      studentsData.push(lista[i]);
    }

    // Almacena el array completo en la propiedad students.students
    this.students.students = studentsData;

    console.log('Nueva lista de estudiantes:', this.students);
  }


  deCodifB64(contenidoTransformadoB64: string): { palabra: string; consultCount: number } | { palabra: string; consultCount: number }[] {
    // Decodificar la cadena base64 a JSON
    const contenidoDecodificadoJSON = atob(contenidoTransformadoB64);

    // Convertir la cadena JSON a un array de objetos o un solo objeto
    try {
      const contenidoDecodificadoArray = JSON.parse(contenidoDecodificadoJSON);
      return contenidoDecodificadoArray;
    } catch (error) {
      // Si hay un error al parsear, significa que solo hay un objeto
      const contenidoDecodificado = JSON.parse(`[${contenidoDecodificadoJSON}]`);
      return contenidoDecodificado[0];
    }
  }

  getAllQuestions() {
    this.questionService.getResultadosJson()
      .subscribe(res => {
        this.resultadosList = res.resultados;
        console.log("datos:",this.resultadosList)
      });
  }

  deleteAllStudentActivities() {
    // Obtén el ID de la historia desde el servicio compartido
    const storyId = this.storyId

    if (storyId) {
      // Llama al servicio para eliminar todas las actividades de estudiantes asociadas a la historia
      this.storiesService.deleteAllStudentActivities(storyId).subscribe(
        (response) => {


          console.log("detalles en lista:",this.students)
          this.router.navigateByUrl('/historial');


          console.log('Todas las actividades de estudiantes eliminadas exitosamente:', response);
          // Puedes manejar la respuesta o realizar acciones adicionales aquí

          // Por ejemplo, puedes recargar la lista de resultados después de eliminar las actividades de estudiantes

        },
        (error) => {
          console.error('Error al intentar eliminar todas las actividades de estudiantes:', error);
          // Puedes manejar errores aquí si es necesario
        }
      );
    } else {
      console.error('No se pudo obtener el ID de la historia desde el servicio compartido.');
      // Puedes manejar errores aquí si es necesario
    }
  }

}
