import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCrearComponent } from './body-crear.component';

describe('BodyCrearComponent', () => {
  let component: BodyCrearComponent;
  let fixture: ComponentFixture<BodyCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyCrearComponent]
    });
    fixture = TestBed.createComponent(BodyCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
