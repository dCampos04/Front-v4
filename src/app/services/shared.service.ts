import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private storyId: number = 0;

  getStoryId(): number {
    return this.storyId;
  }

  setStoryId(id: number): void {
    this.storyId = id;
  }

}
