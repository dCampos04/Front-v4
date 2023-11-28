import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../Modelo/Student";
import { StoryDTORequest } from "../Modelo/StoryDTORequest";
import { StoryResponse } from "../Modelo/StoryDTORequest";
import { StudentActivity } from "../Modelo/StudentActivity"


const base_url=['http://localhost:8080/api/students']

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) { }

  enterName(student: Student): Observable<Student> {
    const url = `${base_url}/register`;
    return this.httpClient.post<Student>(url, student);
  }

  accessStory(accessWord: string): Observable<StoryResponse> {
    const url = `${base_url}/access-story`;
    const storyDTO: StoryDTORequest = { accessWord };
    return this.httpClient.post<StoryResponse>(url, storyDTO);
  }

  completeActivity(studentId: number, activityId: number, studentActivity: StudentActivity): Observable<StudentActivity> {
    const url = `${base_url}/${activityId}/studentActivities/${studentId}`;
    return this.httpClient.post<StudentActivity>(url, studentActivity);
  }


}
