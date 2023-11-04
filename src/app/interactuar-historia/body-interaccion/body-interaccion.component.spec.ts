import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyInteraccionComponent } from './body-interaccion.component';

describe('BodyInteraccionComponent', () => {
  let component: BodyInteraccionComponent;
  let fixture: ComponentFixture<BodyInteraccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyInteraccionComponent]
    });
    fixture = TestBed.createComponent(BodyInteraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
