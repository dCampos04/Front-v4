import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyQuestionComponent } from './body-question.component';

describe('BodyQuestionComponent', () => {
  let component: BodyQuestionComponent;
  let fixture: ComponentFixture<BodyQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyQuestionComponent]
    });
    fixture = TestBed.createComponent(BodyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
