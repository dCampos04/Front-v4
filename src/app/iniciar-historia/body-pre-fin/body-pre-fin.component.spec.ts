import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPreFinComponent } from './body-pre-fin.component';

describe('BodyPreFinComponent', () => {
  let component: BodyPreFinComponent;
  let fixture: ComponentFixture<BodyPreFinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyPreFinComponent]
    });
    fixture = TestBed.createComponent(BodyPreFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
