import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyResultadoComponent } from './body-resultado.component';

describe('BodyResultadoComponent', () => {
  let component: BodyResultadoComponent;
  let fixture: ComponentFixture<BodyResultadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyResultadoComponent]
    });
    fixture = TestBed.createComponent(BodyResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
