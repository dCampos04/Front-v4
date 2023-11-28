import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuestionService } from "../../service/question.service";
import { interval } from "rxjs";
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';
import {SharedService} from "../../services/shared.service";
import {StoriesService} from "../../services/stories.service";
import {Activity} from "../../Modelo/Activity";
import { StudentActivity} from "../../Modelo/StudentActivity";
import {StudentService} from "../../services/student.service";
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-body-interaccion',
  templateUrl: './body-interaccion.component.html',
  styleUrls: ['./body-interaccion.component.css']
})
export class BodyInteraccionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;

  accessWord: string = '';
  public estado: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public malas:any =0;
  selectedPanel: number | null = null;
  vocabclick1: boolean = false;
  vocabclick2: boolean = false;
  vocabclick3: boolean = false;
  storyIdActivity:number=0;
  activity: Activity;
  click3 = 0;
  cont = false;
  cont2 = false;
  cont3 = false;
  public nameStudent: String = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public currentlienzo: number = 0;
  public points: any = 0;
  counter = 120;
  public correctAnswer: any = 0;
  public inCorrectAnswer: any = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  qscli: boolean = false;
  hasAnswered: boolean = false;
  //el back me dara este valor
  jsonConvertido: string = "";
  nombreEstudiante:string="";

  public jsonDecodificado: any = "";


  interaccion = [
    {
      cantidadCorrectas: "",
      cantidadIorrectas: "",
      cantidadPuntos: "",
    },
  ];

  generateJSON() {
    // Construir el objeto JSON deseado

    const jsonidInteraccion = this.interaccion.map((intr, i) => {
      return {
        cantidadCorrectas: intr.cantidadCorrectas,
        cantidadIorrectas: intr.cantidadIorrectas,
        cantidadPuntos: intr.cantidadPuntos,
      };
    });

    const jsonData = {
      interaccion: jsonidInteraccion,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }

  config: Configuration = {
    locale: 'es',
    i18n: {
      es: {
        "input.page.titleTemplate": "",
      }
    },
    role: "Viewer",
    callbacks: { onUpload: "local" },
    ui: {
      elements: {
        view: "advanced",
        navigation: {
          show: false,
          action: {
            close: false,
            back: false,
            load: false,
            save: false,
            export: {
              show: false,
              format: ["application/pdf"]
            },
            download: false,
            custom: [
              {
                label: "common.custom",
                iconName: "default",
                callback: () => { }
              }
            ]
          }
        },
        dock: {
          iconSize: "normal",
          hideLabels: false,
          groups: [
            {
              id: "ly.img.template",
              entryIds: ["ly.img.template"]
            },
            {
              id: "ly.img.defaultGroup",
              showOverview: false
            }
          ],
          defaultGroupId: "ly.img.defaultGroup"
        },
        libraries: {
          insert: {
            entries: (defaultEntries) => defaultEntries,
            floating: false,
            autoClose: false
          },
          replace: {
            entries: (defaultEntries) => defaultEntries,
            floating: false,
            autoClose: false
          }
        },
        panels: {
          inspector: {
            show: false
          },
          assetLibrary: {
            show: false
          },
          settings: {
            show: false
          }
        },
        blocks: {
          opacity: false,
          transform: false,
          "//ly.img.ubq/image": {
            adjustments: false,
            filters: false,
            effects: false,
            blur: false,
            crop: false
          },
          "//ly.img.ubq/page": {
            manage: true,
            format: true,
            maxDuration: 30 * 60
          }
        }
      }
    }
  };

  private instance: any;
  private subscription: Subscription;

  constructor(private router: Router, private questionService: QuestionService, private sharedService:SharedService, private storiesService:StoriesService, private studentService: StudentService) {}

   ngOnInit() {

     this.accessStory()
     this.subscription = interval(5000)
       .pipe(takeUntil(this.destroy$))
       .subscribe(() => {
         try {
           console.log("ejecutandome en desarrollo...")
           this.accessStory();
           this.checkActiveStatus();
         } catch (error) {
           console.error('Error en el intervalo:', error);
           this.unsubscribeInterval();
         }
       });

     this.nombreEstudiante = this.sharedService.getTex2t();

    this.startCounter();

    this.storyIdActivity = this.sharedService.getStoryActivityId();
    console.log('id de la actividad:', this.storyIdActivity);
    if (this.storyIdActivity !== null) {
      // Llamar al servicio para obtener las historias del profesor

      this.storiesService.getAllActivities(this.storyIdActivity).subscribe(
        (response) => {
          console.log('Actividades obtenidas correctamente:', response);

          // Loguea la longitud del array de actividades
          console.log('json:', response.jsonConverted);

          // Assuming you want to access the first element of the array
          this.jsonConvertido=response.jsonConverted;
            console.log('jsonConvertido:', this.jsonConvertido);
            this.desconvertirCadenaAJson();

        },
        (error) => {
          console.error('Error al obtener actividades:', error);
          // Manejar el error según tus necesidades
        }
      );

    } else {
      console.error('No se pudo obtener el ID de la actividad.');
      // Manejar el error según tus necesidades
    }
  }

  private unsubscribeInterval() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }


  accessStory() {
    this.accessWord = this.sharedService.getText();
    console.log('Palabra:', this.accessWord);
    this.studentService.accessStory(this.accessWord).subscribe(
      (response) => {
        console.log('Respuesta del servidor dentro del :', response);
        this.sharedService.setActive(response.active);
        this.estado=response.active
        console.log('estado dentro de la actividad:', this.estado);
      },
      (error) => {
        window.alert('La palabra de acceso no es válida');
        console.error('Error al intentar acceder a la historia:', error);
      }
    );
  }

  private checkActiveStatus() {
    this.estado = this.sharedService.getActive();
    if (this.estado) {
      console.log('estado activo:', this.estado);

      //this.router.navigate(['/desarrollar']);

    } else {
      console.log('estado desacticado:', this.estado);
      this.isQuizCompleted=true;
      //this.router.navigate(['/interactuar']);
      this.unsubscribeInterval();
    }
  }

  ngAfterViewInit() {
    this.initializeCreativeEditor();
  }

  ngOnDestroy() {
    this.unsubscribeInterval();
    this.destroy$.next();
    this.destroy$.complete();
    // Limpieza de CreativeEditorSDK
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  }

  private async initializeCreativeEditor() {
    // Limpiar el contenedor antes de crear un nuevo lienzo
    this.containerRef.nativeElement.innerHTML = '';

    // Asigna la instancia actual a la propiedad 'instance'
    this.instance = await CreativeEditorSDK.create(this.containerRef.nativeElement, this.config);

    await this.instance.addDefaultAssetSources();
    await this.instance.addDemoAssetSources({ sceneMode: "Design" });
    this.instance.engine.scene.loadFromString(this.jsonDecodificado.questions[this.currentlienzo]?.lienzo);
    //this.instance.engine.scene.loadFromString(this.questionList[this.currentlienzo]?.lienzo);

  }

  desconvertirCadenaAJson() {
    if (this.jsonConvertido) {
      const decodedString = atob(this.jsonConvertido);
      this.jsonDecodificado = JSON.parse(decodedString);
      console.log('Contenido codificado en base64:', this.jsonConvertido);
      console.log('Contenido decodificado:', this.jsonDecodificado);

      this.jsonDecodificado.questions[this.currentlienzo]?.lienzo
      console.log('lienzo descodificado', this.jsonDecodificado.questions[this.currentlienzo]?.lienzo);

      console.log('lienzo descodificado', this.jsonDecodificado.questions[4]?.lienzo);
    }
    else {
      console.log('revisar');
    }
  }

  consultas=0;

  clickv1() {
    if (!this.vocabclick1) {
      this.click3 = 1;
      this.vocabclick1 = true;
      this.vocabclick2 = false;
      this.vocabclick3 = false;
    } else {
      this.vocabclick1 = false;
      this.click3 = 0;
    }
    this.consultas=this.consultas+1;
  }


  getAllQuestions() {
    console.log("revisar getallwuestion")
  }

  qsValide() {
    this.qscli = false;
  }

  nextQuestion() {
    if (this.selectedOption) {
      // Verificar si la opción seleccionada es la correcta
      if (this.selectedOption.correct) {
        this.correctAnswer++;this.points=this.points+4;
      } else {
        this.inCorrectAnswer++;
      }
    } else {
      // En caso de que no se haya seleccionado ninguna opción
      this.inCorrectAnswer++;
    }

    this.selectedOption = null;

    console.log("Correctas:",this.correctAnswer)
    console.log("incorrectas:",this.inCorrectAnswer)
    this.cont = false;
    this.cont2 = false;
    this.cont3 = false;
    this.currentQuestion++;
    this.jsonDecodificado.questions[this.currentlienzo+1].lienzo
    this.vocabclick1 = false;
    this.click3 = 0;
    //this.questionList[this.currentlienzo + 1].lienzo;
    this.initializeCreativeEditor();
    this.currentlienzo++;
    this.hasAnswered = false;
    this.qscli = false;
    this.getProgressPorcent();
    if (this.currentQuestion === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }

  }

  previusQuestion() {
    this.currentQuestion--;
    this.getProgressPorcent();
  }

  selectedOption: any;
  selectOption(option: any) {
    if (!this.hasAnswered) {
      // Desmarcar la opción previamente seleccionada (si hay alguna)
      if (this.selectedOption) {
        this.selectedOption.selected = false;
      }

      // Marcar la nueva opción como seleccionada
      option.selected = true;
      this.selectedOption = option;
    }
  }


  startCounter() {
    this.qscli = false;
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.nextQuestion();
          this.getProgressPorcent();
          this.counter = 120;
          this.points -= 0;
          if (this.currentQuestion === this.questionList.length) {
            this.isQuizCompleted = true;
            this.stopCounter();
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
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
    //this.resetCounter();
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
    }
  }

  endQuiz() {

    if (this.selectedOption) {
      // Verificar si la opción seleccionada es la correcta
      if (this.selectedOption.correct) {
        this.correctAnswer++;
        this.points=this.points+4;
      } else {
        this.inCorrectAnswer++;
      }
    } else {
      // En caso de que no se haya seleccionado ninguna opción
      this.inCorrectAnswer++;
    }
    this.selectedOption = null;
    console.log("Correctas:",this.correctAnswer)
    console.log("incorrectas:",this.inCorrectAnswer)
    this.isQuizCompleted = true;
    this.malas=5-this.correctAnswer;
    this.interaccion[0].cantidadCorrectas = this.correctAnswer;
    this.interaccion[0].cantidadIorrectas = this.malas;
    this.interaccion[0].cantidadPuntos = this.points;
    this.generateJSON();
  }


  completarActividad() {

    const studentId =  this.sharedService.getStoryActivityId();
    const activityId = this.sharedService.getStudentId();
    console.log("id de la actividad:", activityId)
    console.log("id del estudiante:", studentId)

    // Supongamos que ya tienes los datos de la actividad
    const studentActivityData: StudentActivity = {
      activityId: studentId,
      studentId: activityId,
      correctAnswer: this.points,
      consultedWord: this.consultas/2,
    };
    console.log("id de la actividad:", studentActivityData)

    // Llama al servicio para completar la actividad
    this.studentService.completeActivity(studentId, activityId, studentActivityData)
      .subscribe(
        completedActivity => {
          // Maneja la respuesta aquí si es necesario
          console.log('Actividad completada:', completedActivity);

        },
        error => {
          // Maneja errores aquí si es necesario
          console.error('Error al completar la actividad:', error);
        }
      );
  }

}
