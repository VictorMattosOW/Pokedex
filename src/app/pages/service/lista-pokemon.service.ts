import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../shared/poke-info.model';

@Injectable({
  providedIn: 'root'
})
export class ListaPokemonService {

  url = 'https://pokeapi.co/api/v2/pokemon/';

  private pokeData = new BehaviorSubject<Pokemon>(new Pokemon());

  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemon(poke: any):Observable<any> {
    return this.httpClient.get<any>(this.url + poke);
  }

  setPokemon(poke: any): void {
    this.pokeData.next(poke);
  }

  getPokemonObservable(): Observable<any> {
    return this.pokeData.asObservable();
  }
}
