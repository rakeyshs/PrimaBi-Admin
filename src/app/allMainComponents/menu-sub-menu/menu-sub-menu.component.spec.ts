import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSubMenuComponent } from './menu-sub-menu.component';

describe('MenuSubMenuComponent', () => {
  let component: MenuSubMenuComponent;
  let fixture: ComponentFixture<MenuSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSubMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
