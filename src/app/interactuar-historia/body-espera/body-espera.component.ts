import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {QuestionService} from "../../service/question.service";


@Component({
  selector: 'app-body-espera',
  templateUrl: './body-espera.component.html',
  styleUrls: ['./body-espera.component.css']
})
export class BodyEsperaComponent implements OnInit{

  public titAutList: any = [];


  constructor(private router: Router, private http: HttpClient, private questionService: QuestionService) { }

  ngOnInit() {
    this.gettitAutData();
    // Cargar datos desde titaut.json usando HttpClient
    //this.http.get<any[]>('/assets/titaut.json').subscribe(data => {
     // this.titAut = data;
    //});
  }

  gettitAutData() {
    this.questionService.getTitautJson()
      .subscribe(res => {
        if (res && res.titaut) {
          this.titAutList = res.titaut;
        } else {
          // La respuesta no tiene el formato esperado
          console.error('Formato de respuesta no válido:', res);
        }
      });
  }
  llevar() {
    this.router.navigate(['/interactua']);
  }
}
