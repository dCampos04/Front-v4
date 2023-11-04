import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyInteractuaComponent } from './body-interactua.component';

describe('BodyInteractuaComponent', () => {
  let component: BodyInteractuaComponent;
  let fixture: ComponentFixture<BodyInteractuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyInteractuaComponent]
    });
    fixture = TestBed.createComponent(BodyInteractuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
