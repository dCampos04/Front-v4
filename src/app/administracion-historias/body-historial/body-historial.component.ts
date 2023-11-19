import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'app-body-historial',
  templateUrl: './body-historial.component.html',
  styleUrls: ['./body-historial.component.css']
})
export class BodyHistorialComponent  implements OnInit{

  public librosList: any = [];


  constructor(private questionService: QuestionService) {
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


  getAllLibros() {
    this.questionService.getLibrosJson()
      .subscribe(res => {
        this.librosList = res.libros;
      })
  }
}
