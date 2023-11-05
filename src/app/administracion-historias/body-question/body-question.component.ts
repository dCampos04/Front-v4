import {Component} from '@angular/core';


@Component({
  selector: 'app-body-question',
  templateUrl: './body-question.component.html',
  styleUrls: ['./body-question.component.css'],
})
export class BodyQuestionComponent {
  idStory = [''];
  questions = [
    {
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
    },
    {
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
    },
    {
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
    },
    {
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
    },
    {
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
    },
  ];

  page: number = 1;

  nextpage() {
    this.page++;
  }

  prevpage() {
    this.page--;
  }
  nextQuestion(index: number) {
    if (index < this.questions.length - 1) {
      // Solo avanza si no es la última pregunta
      index++;
    }
  }

  submitForm(index: number) {
    console.log('Datos del formulario:', this.questions[index]);
  }
  generateJSON() {
    // Construir el objeto JSON deseado
    const jsonQuestions = this.questions.map((question, i) => {
      return {
        questionText: question.questionText,
        options: question.options.map((option) => ({
          text: option.text,
          correct: option.correct,
        })),
      };
    });

    const jsonData = {
      questions: jsonQuestions,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }
  // Establece la propiedad 'correct' en true para la opción seleccionada
  updateCorrectOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.forEach((option, index) => {
      if (index === optionIndex) {
        option.correct = true;
      } else {
        option.correct = false;
      }
    });
  }
}





