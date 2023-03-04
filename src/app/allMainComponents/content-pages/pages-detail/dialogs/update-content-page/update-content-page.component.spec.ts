import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContentPageComponent } from './update-content-page.component';

describe('UpdateContentPageComponent', () => {
  let component: UpdateContentPageComponent;
  let fixture: ComponentFixture<UpdateContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
