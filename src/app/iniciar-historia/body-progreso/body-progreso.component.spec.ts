import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyProgresoComponent } from './body-progreso.component';

describe('BodyProgresoComponent', () => {
  let component: BodyProgresoComponent;
  let fixture: ComponentFixture<BodyProgresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyProgresoComponent]
    });
    fixture = TestBed.createComponent(BodyProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
