import { Component , OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'app-body-finalizado',
  templateUrl: './body-finalizado.component.html',
  styleUrls: ['./body-finalizado.component.css']
})
export class BodyFinalizadoComponent implements OnInit  {

  public resultadosList: any = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }
  getAllQuestions() {
    this.questionService.getResultadosJson()
      .subscribe(res => {
        this.resultadosList = res.resultados;
      });
  }
}
