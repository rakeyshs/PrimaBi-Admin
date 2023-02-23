import { TestBed } from '@angular/core/testing';

import { MenuSubMenuService } from './menu-sub-menu.service';

describe('MenuSubMenuService', () => {
  let service: MenuSubMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSubMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
