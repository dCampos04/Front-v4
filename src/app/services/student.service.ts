import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../Modelo/Student";
import { StoryDTORequest } from "../Modelo/StoryDTORequest";
import { StoryResponse } from "../Modelo/StoryDTORequest";
import { StudentActivity } from "../Modelo/StudentActivity"
import {environments} from "../../environments/environments";



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url:string = environments.baseUrl;

  constructor(private httpClient:HttpClient) { }

  accessStory(accessWord: string): Observable<StoryResponse> {
    const url = `${this.url}/api/students/access-story`;
    const storyDTO: StoryDTORequest = { accessWord };
    return this.httpClient.post<StoryResponse>(url, storyDTO);
  }

  enterName(student: Student): Observable<Student> {
    const url = `${this.url}/api/students/register-student`;
    return this.httpClient.post<Student>(url, student);
  }

  completeActivity(studentId: number, activityId: number, studentActivity: StudentActivity): Observable<StudentActivity> {
    const url = `${this.url}/api/students/${studentId}/studentActivities/${activityId}`;
    return this.httpClient.post<StudentActivity>(url, studentActivity);
  }
}
