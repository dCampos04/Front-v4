import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInteractuaComponent } from './header-interactua.component';

describe('HeaderInteractuaComponent', () => {
  let component: HeaderInteractuaComponent;
  let fixture: ComponentFixture<HeaderInteractuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInteractuaComponent]
    });
    fixture = TestBed.createComponent(HeaderInteractuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
