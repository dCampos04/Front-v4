import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Story } from "../Modelo/Story";
import { Activity } from "../Modelo/Activity";
import { StoryDTO } from "../Modelo/StoryDTO";




const base_url=['http://localhost:8080/api/stories']
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
    return this.httpClient.post<Activity>(url, activity);
  }

  getStoriesByTeacherId(teacherId: number): Observable<StoryDTO[]> {
    const url = `${base_url}/byTeacher/${teacherId}`;
    return this.httpClient.get<StoryDTO[]>(url);
  }






}
