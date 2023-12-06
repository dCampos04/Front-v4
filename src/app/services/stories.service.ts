import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Story } from "../Modelo/Story";
import { Activity } from "../Modelo/Activity";
import { StoryDTO } from "../Modelo/StoryDTO";
import {environments} from "../../environments/environments";


@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  url:string = environments.baseUrl;

  private storyIdSource = new BehaviorSubject<number>(0);
  currentStoryId = this.storyIdSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  createStory(story: Story): Observable<Story> {
    const url = `${this.url}/api/stories/createStory/${story.teacherId}`; // Asegúrate de tener teacherId en tu modelo Story
    return this.httpClient.post<Story>(url, story);
  }

  assignActivityToStory(activity: Activity): Observable<Activity> {
    const url = `${this.url}/api/stories/${activity.storyId}/activity`;
    return this.httpClient.put<Activity>(url, activity);
  }


  getStoriesByTeacherId(teacherId: number): Observable<StoryDTO[]> {
    const url = `${this.url}/api/stories/byTeacher/${teacherId}`;
    return this.httpClient.get<StoryDTO[]>(url);
  }

  activateStory(storyId: number): Observable<any> {
    const url = `${this.url}/api/stories/activate/${storyId}`;
    return this.httpClient.put(url, null);
  }

  getAllActivities(storyId: number): Observable<Activity> {
    const url = `${this.url}/api/stories/${storyId}/activity`;
    return this.httpClient.get<Activity>(url);
  }


  deactivateStory(storyId: number|undefined): Observable<any> {
    const url = `${this.url}/api/stories/deactivate/${storyId}`;
    return this.httpClient.put(url, null);
  }



  deleteAllStudentActivities(storyId: number): Observable<any> {
    const url = `${this.url}/api/stories/${storyId}/activity/deleteStudentActivities`;
    return this.httpClient.delete(url);
  }


}
