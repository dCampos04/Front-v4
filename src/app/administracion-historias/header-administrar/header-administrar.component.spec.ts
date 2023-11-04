import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdministrarComponent } from './header-administrar.component';

describe('HeaderAdministrarComponent', () => {
  let component: HeaderAdministrarComponent;
  let fixture: ComponentFixture<HeaderAdministrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAdministrarComponent]
    });
    fixture = TestBed.createComponent(HeaderAdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
