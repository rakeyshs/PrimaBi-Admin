import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogBoxComponent } from './form-dialog-box.component';

describe('FormDialogBoxComponent', () => {
  let component: FormDialogBoxComponent;
  let fixture: ComponentFixture<FormDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
