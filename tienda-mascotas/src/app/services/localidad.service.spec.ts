import { TestBed } from '@angular/core/testing';

import { LocalidadService } from './localidad.service';

describe('LocalidadService', () => {
  let service: LocalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
