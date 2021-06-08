import { TestBed } from '@angular/core/testing';

import { ManejoUsuariosService } from './manejo-usuarios.service';

describe('ManejoUsuariosService', () => {
  let service: ManejoUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
