
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements AfterViewInit {

  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;

  title = 'Integrate CreativeEditor SDK with Angular';
  jsonapi: string="";
  bbb: boolean= false;
  private instance: any;
  constructor(private router: Router) {}

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
        this.jsonapi="";
        this.jsonapi=scene;
        this.bbb = true;
      },
      onLoad: () => {
        window.alert('Load callback!');
        const scene = '...'; // Fill with sene
        return Promise.resolve(scene);
      },
      onExport: (blobs, options) => {
        window.alert('Export callback!');
        console.info(options.mimeType);
        console.info(options.jpegQuality);
        console.info(options.pages);
        return Promise.resolve();
      },
      onUpload: (file, onProgress) => {
        window.alert('Upload callback!');
        const newImage = {
          id: 'exampleImageIdentifier',
          meta: {
            uri: 'https://YOURSERVER/images/file.jpg',
            thumbUri: 'https://YOURSERVER/images/thumb.jpg'
          }
        };
        return Promise.resolve(newImage);
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
              format: ["application/pdf"]
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
            show: true // true or false
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
}

