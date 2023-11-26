import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVocabularyComponent } from './body-vocabulary.component';

describe('BodyVocabularyComponent', () => {
  let component: BodyVocabularyComponent;
  let fixture: ComponentFixture<BodyVocabularyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyVocabularyComponent]
    });
    fixture = TestBed.createComponent(BodyVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
