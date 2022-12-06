import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaPokemonService {

  url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemon(poke: any):Observable<any> {
    return this.httpClient.get<any>(this.url + poke);
  }
}
