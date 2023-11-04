import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVacioComponent } from './header-vacio.component';

describe('HeaderVacioComponent', () => {
  let component: HeaderVacioComponent;
  let fixture: ComponentFixture<HeaderVacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderVacioComponent]
    });
    fixture = TestBed.createComponent(HeaderVacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
