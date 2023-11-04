import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFinalizadoComponent } from './body-finalizado.component';

describe('BodyFinalizadoComponent', () => {
  let component: BodyFinalizadoComponent;
  let fixture: ComponentFixture<BodyFinalizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyFinalizadoComponent]
    });
    fixture = TestBed.createComponent(BodyFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
