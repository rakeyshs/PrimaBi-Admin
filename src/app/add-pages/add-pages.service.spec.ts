import { TestBed } from '@angular/core/testing';

import { AddPagesService } from './add-pages.service';

describe('AddPagesService', () => {
  let service: AddPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
