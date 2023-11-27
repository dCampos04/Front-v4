import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StoryDTO } from '../Modelo/StoryDTO';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private selectedStorySource = new BehaviorSubject<StoryDTO | null>(null);
  selectedStory = this.selectedStorySource.asObservable();

  setSelectedStory(story: StoryDTO) {
    this.selectedStorySource.next(story);
  }


  private storyId: number = 0;

  setStoryId(id: number): void {
    this.storyId = id;
  }

  getStoryId(): number {
    return this.storyId;
  }



}
