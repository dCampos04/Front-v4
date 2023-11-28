import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';
import { Router } from '@angular/router';
import { StoriesService } from "../../services/stories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Activity} from "../../Modelo/Activity";
import { SharedService} from "../../services/shared.service";


export interface DefaultEntries {
  someProperty: string;
  anotherProperty: number;
}


@Component({
  selector: 'app-body-question',
  templateUrl: './body-question.component.html',
  styleUrls: ['./body-question.component.css'],
})
export class BodyQuestionComponent implements AfterViewInit, OnInit {

  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;
  aa:string ="sdssdfsd";
  vv:string ="hola";
  title = 'Integrate CreativeEditor SDK with Angular';
  page: number = 1;
  prevCode: string[] = [];
  imageCodes: string[] = [];
  bbb: boolean= false;
  ccc: boolean=false;
  private instance: any;
  private imageCodeIndex: number = 0;
  jsonConvertido: string = '';
  imgPrincipal: string = '';
  private imageblobIndex: number = 0;

  postStoryForm: FormGroup;



  constructor( private storiesService: StoriesService, private fb: FormBuilder, private router: Router, private authService: AuthService, private sharedService: SharedService // Agrega el servicio compartido
  ) {
    this.postStoryForm = this.fb.group({});
  }

  ngOnInit() {
    this.postStoryForm = this.fb.group({
      title: [null, [Validators.required]],
      accessWord: [null, [Validators.required]],
    });
  }



  ngAfterViewInit() {
      this.initializeCreativeEditor();
  }

  private async initializeCreativeEditor() {

    // Asigna la instancia actual a la propiedad 'instance'
    this.instance = await CreativeEditorSDK.create(this.containerRef.nativeElement, this.config);

    await this.instance.addDefaultAssetSources();
    await this.instance.addDemoAssetSources({ sceneMode: "Design" });
    this.instance.createDesignScene();
  }


  config: Configuration = {
    // Serve assets from IMG.LY cdn or locally
    baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.17.0/assets',
    // Enable local uploads in Asset Library
    locale: 'es',
    i18n: {
      es: {}
    },
    callbacks: {
      onUpload:'local',
      onUnsupportedBrowser: () => {
        /* This is the default window alert which will be shown in case an unsupported
         * browser tries to run CE.SDK */
        window.alert(
          'Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer'
        );
      },
      onBack: () => {
        window.alert('Back callback!');
      },
      onClose: () => {
        window.alert('Close callback!');
      },
      onSave: (scene: any ) => {
        window.alert('Save callback!');
        console.info(scene);

        if (this.imageCodes.length >= this.imageCodeIndex + 1) {
          // Si hay un elemento en la posición actual, sobrescríbelo
          this.imageCodes[this.imageCodeIndex] = scene;
        } else {
          // Si no hay un elemento en la posición actual, agrégalo al final
          this.imageCodes.push(scene);
        }
        this.bbb = true;
      },
      onLoad: () => {
        window.alert('Load callback!');
        const scene = ''; // Fill with sene
        return Promise.resolve(scene);

      },
      onExport: async (blobs: any[], opciones: any) => {
        window.alert('Export callback!');
        this.ccc = true;

        console.log('index callback', this.imageblobIndex);

        // Obtén el Blob de la imagen
        const imageBlob = blobs[0];
        console.log('index', this.imageblobIndex);
        console.log('blob', imageBlob);

        // Convierte el Blob a base64
        const base64String = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);

        });

        console.log('Código base64 de la imagen:', base64String);

        this.prevCode[this.imageblobIndex]=base64String;

        console.log('index', this.imageblobIndex);

        console.log('imagen', this.prevCode[this.imageblobIndex]);

        console.log('index', this.imageblobIndex);
        return Promise.resolve();
      }



    },
    //Agregar quiz
    ui: {
      // docs-ui-elements
      elements: {
        // docs-ui-view
        view: "default", // 'default' or 'advanced'
        // docs-ui-view
        // docs-ui-navigation
        navigation: {
          show: true, // 'false' to hide the navigation completely

          // docs-ui-actions
          action: {
            close: false, // true or false
            back: false, // true or false
            load: false, // true or false
            save: false, // true or false
            export: {
              show: true,
              format: ["image/png"]
            },
            download: false, // true  or false
            // docs-ui-actions
            // docs-ui-custom-actions
            custom: [
              {
                label: "common.custom", // string or i18n key
                iconName: "default", // one of 'default', 'download', 'upload', or 'save'
                callback: () => {
                  // callback signature is `() => void | Promise<void>`
                  // place custom functionality here
                }
              }
            ]
            // docs-ui-custom-actions
          }
        },
        // docs-ui-navigation
        // docs-ui-panels
        panels: {


          settings: {
            show: false // true or false
          }
        },
        // docs-ui-panels
        // docs-ui-dock
        dock: {
          iconSize: "large", // 'large' or 'normal'
          hideLabels: false, // false or true
          groups: [
            {
              id: "ly.img.template", // string
              entryIds: ["ly.img.template"] // string[]
            },
            {
              id: "ly.img.defaultGroup", // string
              showOverview: true // true or false
            }
          ],
          defaultGroupId: "ly.img.defaultGroup" // string
        },
        // docs-ui-dock
        // docs-ui-libraries
        libraries: {
          insert: {

          },
          replace: {

          }
        },
        // docs-ui-libraries
        // docs-ui-blocks
        blocks: {
          opacity: false, // true  or false
          transform: false, // true  or false
          "//ly.img.ubq/image": {
            adjustments: true, // true  or false
            filters: false, // true  or false
            effects: false, // true  or false
            blur: true, // true  or false
            crop: false // true  or false
          },
          // docs-ui-pages
          "//ly.img.ubq/page": {
            manage: false,
            format: true,
            maxDuration: 30 * 60
          }
          // docs-ui-pages
        }
        // docs-ui-blocks
      }
      // docs-ui-elements


    },
  };

  protected readonly open = open;

  questions = [
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: "",
      casouso: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: "",
      casouso: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: "",
      casouso: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: "",
      casouso: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: "",
      casouso: ""
    },
  ];

  nextpage() {

    if (this.ccc) {
      this.imageblobIndex=this.imageblobIndex+1;
      this.limpiarLienzo();
      this.page++;
      this.imageCodeIndex++; // Incrementar el índice cuando avanzas a la siguiente página
      this.ccc=false;
      console.log("index nuevo= ", this.imageblobIndex)
    } else {
       if (!this.ccc){
        window.alert('guardar antes de continuar!');
        this.ccc=false;
      }

    }

  }

  submitForm(index: number) {
    console.log('Datos del formulario(Preguntas):', this.questions[index]);
  }

  generateJSON() {
    if (this.ccc) {
      // Obtén la ID de la historia desde el servicio compartido
      const storyId = this.sharedService.getStoryId();

      // Iterar sobre las preguntas y asignar el valor de "imageCodes" a la propiedad "lienzo"
      for (let i = 0; i < this.questions.length; i++) {
        // Obtener el valor correspondiente de "imageCodes" (asegúrate de que haya suficientes elementos en el array)
        const imageCode = this.prevCode[i] || '';

        // Construir la pregunta con la propiedad "lienzo"
        const question = {
          lienzo: imageCode,
          questionText: this.questions[i].questionText,
          options: this.questions[i].options.map((option) => ({
            text: option.text,
            correct: option.correct,
          })),
          palabraText: this.questions[i].palabraText,
          significado: this.questions[i].significado,
          casouso: this.questions[i].casouso,
        };
        // Asignar la pregunta modificada de nuevo al arreglo de preguntas
        this.questions[i] = question;
      }

      // Resto del código para generar el JSON
      const jsonData = {
        questions: this.questions,
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      console.log('JSON generado:', jsonString);

      // Convertir la cadena JSON a base64
      const base64String = btoa(jsonString);

      // Asignar el resultado a la variable jsonConvertido
      this.jsonConvertido = base64String;
      console.log('Contenido codificado en base64:', this.jsonConvertido);
      console.log('prev code', this.prevCode[0])

      const activity: Activity = {
        jsonConverted: this.jsonConvertido,
        imgPreview: this.prevCode[0],
        storyId: storyId, // Usar la ID de la historia obtenida del servicio compartido
      };

      this.storiesService.assignActivityToStory(activity).subscribe(
        (assignedStory) => {
          console.log('Actividad asignada exitosamente a la historia:', assignedStory);
          this.router.navigate(['/historial']);
        },
        (error) => {
          console.error('Error al asignar actividad a la historia:', error);
        }
      );
    } else {
      window.alert('Guardar antes de seguir!');
      this.ccc = false;
    }
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
  limpiarLienzo() {
    // Agrega la lógica para limpiar el lienzo aquí
    // Puedes reiniciar la escena o realizar las operaciones necesarias para tener un lienzo en blanco.
    this.instance.createDesignScene();
  }


}





