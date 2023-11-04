import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyEsperaComponent } from './body-espera.component';

describe('BodyEsperaComponent', () => {
  let component: BodyEsperaComponent;
  let fixture: ComponentFixture<BodyEsperaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyEsperaComponent]
    });
    fixture = TestBed.createComponent(BodyEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
