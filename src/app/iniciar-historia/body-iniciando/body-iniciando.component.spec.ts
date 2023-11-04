import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyIniciandoComponent } from './body-iniciando.component';

describe('BodyIniciandoComponent', () => {
  let component: BodyIniciandoComponent;
  let fixture: ComponentFixture<BodyIniciandoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyIniciandoComponent]
    });
    fixture = TestBed.createComponent(BodyIniciandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
