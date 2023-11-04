import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Body2InteractuaComponent } from './body2-interactua.component';

describe('Body2InteractuaComponent', () => {
  let component: Body2InteractuaComponent;
  let fixture: ComponentFixture<Body2InteractuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Body2InteractuaComponent]
    });
    fixture = TestBed.createComponent(Body2InteractuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
