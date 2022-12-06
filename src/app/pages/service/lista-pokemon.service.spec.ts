import { TestBed } from '@angular/core/testing';

import { ListaPokemonService } from './lista-pokemon.service';

describe('ListaPokemonService', () => {
  let service: ListaPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
