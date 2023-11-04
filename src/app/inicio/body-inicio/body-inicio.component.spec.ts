import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyInicioComponent } from './body-inicio.component';

describe('BodyInicioComponent', () => {
  let component: BodyInicioComponent;
  let fixture: ComponentFixture<BodyInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyInicioComponent]
    });
    fixture = TestBed.createComponent(BodyInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
