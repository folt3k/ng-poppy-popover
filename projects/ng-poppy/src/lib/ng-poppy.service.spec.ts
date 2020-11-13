import { TestBed } from '@angular/core/testing';

import { NgPoppyService } from './ng-poppy.service';

describe('NgPoppyService', () => {
  let service: NgPoppyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPoppyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
