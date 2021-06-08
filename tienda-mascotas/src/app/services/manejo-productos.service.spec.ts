import { TestBed } from '@angular/core/testing';

import { ManejoProductosService } from './manejo-productos.service';

describe('ManejoProductosService', () => {
  let service: ManejoProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
