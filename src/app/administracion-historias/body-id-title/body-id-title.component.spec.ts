import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyIdTitleComponent } from './body-id-title.component';

describe('BodyIdTitleComponent', () => {
  let component: BodyIdTitleComponent;
  let fixture: ComponentFixture<BodyIdTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyIdTitleComponent]
    });
    fixture = TestBed.createComponent(BodyIdTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
