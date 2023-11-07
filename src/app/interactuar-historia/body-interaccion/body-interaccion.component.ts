import { Component, Directive, OnInit} from '@angular/core';
import { QuestionService } from "../../service/question.service";
import { VocabularyService } from "../../qservice/vocabulary.service";

import { interval, timeout} from "rxjs";



@Component({
  selector: 'app-body-interaccion',
  templateUrl: './body-interaccion.component.html',
  styleUrls: ['./body-interaccion.component.css']
})
export class BodyInteraccionComponent implements OnInit {
  selectedPanel: number | null = null;
  vocabclick1 : boolean = false;
  vocabclick2 : boolean = false;
  vocabclick3 : boolean = false;
  click3 = 0;
  public apiImageURL: string = '';
  public nameStudent: String = "";
  public questionList: any = [];
  public vocabularyList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 120;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  qscli: boolean = false;
  hasAnswered: boolean = false;


  constructor(private questionService: QuestionService, private vocabularyService: VocabularyService) {
  }

  ngOnInit(): void {
    this.nameStudent = localStorage.getItem("nameStudent")!;
    this.getAllQuestions();
    this.getAllVocabularys()
    this.startCounter();
  }
  getAllVocabularys() {
    this.vocabularyService.getQuestionJson2()
      .subscribe(res => {
        this.vocabularyList = res.vocabularys;
        this.apiImageURL = res.imageUrl;
      })
  }
  togglePanel(panel: number) {
    if (this.selectedPanel === panel) {
      this.selectedPanel = null; // Cerrar el panel si ya está abierto
    } else {
      this.selectedPanel = panel; // Abrir el panel seleccionado
    }
  }
  clickv1() {
    if (!this.vocabclick1){
      this.click3=1;
      this.vocabclick1 = true;
      this.vocabclick2 = false;
      this.vocabclick3 = false;

    } else {
      this.vocabclick1 = false;
      this.click3=0;
    }
  }
  clickv2() {
    if (!this.vocabclick2){
      this.click3=2;
      this.vocabclick1 = false;
      this.vocabclick2 = true;
      this.vocabclick3 = false;

    } else {
      this.vocabclick2 = false;
      this.click3=0;
    }
  }
  clickv3() {
    if (!this.vocabclick3){
      this.click3=3;
      this.vocabclick1 = false;
      this.vocabclick2 = false;
      this.vocabclick3 = true;

    } else {
      this.vocabclick3 = false;
      this.click3=0;
    }
  }


  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
        this.apiImageURL = res.imageUrl; // Aquí asignas la URL de la imagen
      })
  }
  qsValide() {
    this.qscli = false;
  }

  nextQuestion() {
    if (!this.qscli){
      this.inCorrectAnswer++;
    }
    this.hasAnswered = false;
    this.qscli = false;
    this.currentQuestion++;
    this.getProgressPorcent();
    if (this.currentQuestion===this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
  }

  previusQuestion() {
    this.currentQuestion--;
    this.getProgressPorcent();
  }

  answer(currentQno: number, option: any) {
    this.getProgressPorcent();

    if (option.correct && !this.qscli) {
      this.points += 4;
      this.correctAnswer++;
      this.qscli = true;
    } if (!option.correct && !this.qscli) {
      this.inCorrectAnswer++;
      this.qscli = true;
    }

    if (currentQno === this.questionList.length) {
      setTimeout(() => {
        this.isQuizCompleted = true;
      }, 1000);
      this.stopCounter();
    }
  }

  startCounter() {
    this.qscli = false;
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.getProgressPorcent();
          //this.updateProgress();
          this.counter = 120;
          this.points -= 0;
          if (this.currentQuestion===this.questionList.length) {
            this.isQuizCompleted = true;
            this.stopCounter();
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000)
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 120;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 120;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPorcent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  updateProgress() {
    if (this.currentQuestion >= this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    } else {
      //this.getProgressPorcent();
    }
  }

  endQuiz(){
    if (!this.qscli){
      this.inCorrectAnswer++;
    }
    this.isQuizCompleted = true;
  }


}
