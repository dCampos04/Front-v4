import { Component , OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {StudentDetails} from "../../Modelo/studentDetails";
import {SharedService} from "../../services/shared.service";
import { StoriesService } from "../../services/stories.service";
import {Router} from "@angular/router";
import {StudentListRes} from "../../Modelo/StudentListRes";


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



  ngOnInit(): void {
    this.getAllQuestions();
    this.students=this.sharedService.getStudentDetails()
    this.storyId = this.sharedService.getActivityId()
    console.log("detalles en lista:",this.students)
    console.log("id de la historia", this.storyId)
  }
  getAllQuestions() {
    this.questionService.getResultadosJson()
      .subscribe(res => {
        this.resultadosList = res.resultados;
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
