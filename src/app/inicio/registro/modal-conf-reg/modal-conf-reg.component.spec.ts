import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfRegComponent } from './modal-conf-reg.component';

describe('ModalConfRegComponent', () => {
  let component: ModalConfRegComponent;
  let fixture: ComponentFixture<ModalConfRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfRegComponent]
    });
    fixture = TestBed.createComponent(ModalConfRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
