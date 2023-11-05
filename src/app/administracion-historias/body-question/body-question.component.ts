import {Component} from '@angular/core';

@Component({
  selector: 'app-body-question',
  templateUrl: './body-question.component.html',
  styleUrls: ['./body-question.component.css'],
})
export class BodyQuestionComponent {
  questions = [
    {
      historia: '',
      pregunta: '',
      respuestas: ['', '', '', ''],
      respuestaCorrecta: '1',
    },
    {
      historia: '',
      pregunta: '',
      respuestas: ['', '', '', ''],
      respuestaCorrecta: '1',
    },
    {
      historia: '',
      pregunta: '',
      respuestas: ['', '', '', ''],
      respuestaCorrecta: '1',
    },
    {
      historia: '',
      pregunta: '',
      respuestas: ['', '', '', ''],
      respuestaCorrecta: '1',
    },
    {
      historia: '',
      pregunta: '',
      respuestas: ['', '', '', ''],
      respuestaCorrecta: '1',
    },
  ];

  page: number = 1;

  nextpage() {
    this.page++;
  }

  prevpage() {
    this.page--;
  }

  submitForm(index: number) {
    console.log('Datos del formulario:', this.questions[index]);
  }
  generateJSON() {
    const jsonQuestions = this.questions.map((question, i) => {
      return {
        questionText: question.pregunta,
        options: question.respuestas.map((respuesta, j) => {
          return {
            text: respuesta,
            correct: j + 1 === +question.respuestaCorrecta,
          };
        }),
      };
    });

    const jsonData = {
      questions: jsonQuestions,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }
}





