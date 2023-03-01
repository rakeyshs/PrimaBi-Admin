import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubPageComponent } from './edit-sub-page.component';

describe('EditSubPageComponent', () => {
  let component: EditSubPageComponent;
  let fixture: ComponentFixture<EditSubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
