import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPokemonService } from '../service/lista-pokemon.service';
import { Pokemon } from '../shared/poke-info.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent {

  readonly pokemonArray$: Observable<Pokemon[]> =this.pokemonService.getPokemonObservable();

  constructor(private pokemonService: ListaPokemonService) {}

  ngOnInit(): void {
  }

}
