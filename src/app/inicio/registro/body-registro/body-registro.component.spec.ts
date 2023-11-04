import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyRegistroComponent } from './body-registro.component';

describe('BodyRegistroComponent', () => {
  let component: BodyRegistroComponent;
  let fixture: ComponentFixture<BodyRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyRegistroComponent]
    });
    fixture = TestBed.createComponent(BodyRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
