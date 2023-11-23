import { Component } from '@angular/core';


const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.18.0/assets'
};
const exportButton = document.getElementById('export_button');
@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent {

}

class ApiComponentImpl extends ApiComponent {
}
