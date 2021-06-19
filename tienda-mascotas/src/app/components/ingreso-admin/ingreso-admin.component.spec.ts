import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoAdminComponent } from './ingreso-admin.component';

describe('IngresoAdminComponent', () => {
  let component: IngresoAdminComponent;
  let fixture: ComponentFixture<IngresoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
