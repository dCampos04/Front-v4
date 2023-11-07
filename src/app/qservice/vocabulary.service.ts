import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  constructor(private http : HttpClient) { }

  getQuestionJson2(){
    return this.http.get<any>("assets/vocabularys.json");
  }
}
