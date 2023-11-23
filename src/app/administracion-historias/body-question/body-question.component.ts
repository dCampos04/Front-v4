import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';
import { Router } from '@angular/router';



@Component({
  selector: 'app-body-question',
  templateUrl: './body-question.component.html',
  styleUrls: ['./body-question.component.css'],
})
export class BodyQuestionComponent implements AfterViewInit {

  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;

  title = 'Integrate CreativeEditor SDK with Angular';
  page: number = 1;
  imageCodes: string[] = [];
  bbb: boolean= false;
  private instance: any;
  private imageCodeIndex: number = 0;
  jsonConvertido: string = '';
  jsonDesconvertido: any;


  constructor(private router: Router) {}


  ngAfterViewInit() {
    this.initializeCreativeEditor();
  }

  ngOnDestroy() {
    // Limpieza de CreativeEditorSDK
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
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
      onUpload: 'local',


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
      onSave: (scene) => {
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
        const scene = '...'; // Fill with sene
        return Promise.resolve(scene);
      },
      onExport: async (blobs, options) => {
        window.alert('Export callback!');

        // Obtén el Blob de la imagen
        const imageBlob = blobs[0];

        // Convierte el Blob a base64
        const base64String = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);
        });

        // Muestra el código base64 en la consola
        console.log('Código base64 de la imagen:', base64String);

        // Puedes guardar el archivo, mostrarlo al usuario o realizar otras operaciones según tus necesidades
        // Ejemplo de cómo mostrar la imagen en una nueva ventana/tab:
        const imageUrl = URL.createObjectURL(imageBlob);
        window.open(imageUrl);

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
            load: true, // true or false
            save: true, // true or false
            export: {
              show: true,
              format: ["image/png"]
            },
            download: true, // true  or false
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
            entries: (defaultEntries) => defaultEntries,
            floating: true, // true or false
            autoClose: false // true or false
          },
          replace: {
            entries: (defaultEntries) => defaultEntries,
            floating: true, // true or false
            autoClose: false // true or false
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

  validonSave() {
    if (this.bbb) {
      // Navegar al enlace "/quiz" si bbb es verdadero
      this.router.navigate(['/quiz']);
    } else {
      window.alert('Guardar antes de seguir!');
      // No navegar si bbb es falso
    }
  }


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
    if (this.bbb) {
      this.limpiarLienzo();
      this.page++;
      this.bbb = false;
      this.imageCodeIndex++; // Incrementar el índice cuando avanzas a la siguiente página
    } else {
      window.alert('Guardar antes de seguir!');
      this.bbb=false;
    }

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
    console.log('Datos del formulario(Preguntas):', this.questions[index]);
  }

  generateJSON() {
    if (this.bbb) {
      // Iterar sobre las preguntas y asignar el valor de "imageCodes" a la propiedad "lienzo"
      for (let i = 0; i < this.questions.length; i++) {
        // Obtener el valor correspondiente de "imageCodes" (asegúrate de que haya suficientes elementos en el array)
        const imageCode = this.imageCodes[i] || '';

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
          casouso: this.questions[i].casouso
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

      this.router.navigate(['/historial']);

      // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
    } else {
      window.alert('Guardar antes de seguir!');
      this.bbb=false;
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





