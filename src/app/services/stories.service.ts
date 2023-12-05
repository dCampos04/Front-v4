import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Story } from "../Modelo/Story";
import { Activity } from "../Modelo/Activity";
import { StoryDTO } from "../Modelo/StoryDTO";




const base_url=['http://localhost:8080/api/stories']
//const base_url1=['https://3.143.233.119/api/stories'];

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  private storyIdSource = new BehaviorSubject<number>(0);
  currentStoryId = this.storyIdSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  createStory(story: Story): Observable<Story> {
    const url = `${base_url}/createStory/${story.teacherId}`; // Asegúrate de tener teacherId en tu modelo Story
    return this.httpClient.post<Story>(url, story);
  }

  assignActivityToStory(activity: Activity): Observable<Activity> {
    const url = `${base_url}/${activity.storyId}/activity`;
    return this.httpClient.put<Activity>(url, activity);
  }


  getStoriesByTeacherId(teacherId: number): Observable<StoryDTO[]> {
    const url = `${base_url}/byTeacher/${teacherId}`;
    return this.httpClient.get<StoryDTO[]>(url);
  }

  activateStory(storyId: number): Observable<any> {
    const url = `${base_url}/activate/${storyId}`;
    return this.httpClient.put(url, null);
  }

  getAllActivities(storyId: number): Observable<Activity> {
    const url = `${base_url}/${storyId}/activity`;
    return this.httpClient.get<Activity>(url);
  }


  deactivateStory(storyId: number|undefined): Observable<any> {
    const url = `${base_url}/deactivate/${storyId}`;
    return this.httpClient.put(url, null);
  }



  deleteAllStudentActivities(storyId: number): Observable<any> {
    const url = `${base_url}/${storyId}/activity/deleteStudentActivities`;
    return this.httpClient.delete(url);
  }


}
