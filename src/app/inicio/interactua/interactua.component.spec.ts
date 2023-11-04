import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractuaComponent } from './interactua.component';

describe('InteractuaComponent', () => {
  let component: InteractuaComponent;
  let fixture: ComponentFixture<InteractuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteractuaComponent]
    });
    fixture = TestBed.createComponent(InteractuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
