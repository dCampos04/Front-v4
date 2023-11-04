import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHistorialComponent } from './body-historial.component';

describe('BodyHistorialComponent', () => {
  let component: BodyHistorialComponent;
  let fixture: ComponentFixture<BodyHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyHistorialComponent]
    });
    fixture = TestBed.createComponent(BodyHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
