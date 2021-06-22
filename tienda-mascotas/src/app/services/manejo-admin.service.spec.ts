import { TestBed } from '@angular/core/testing';

import { ManejoAdminService } from './manejo-admin.service';

describe('ManejoAdminService', () => {
  let service: ManejoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
