import { Pokemon } from './../shared/poke-info.model';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListaPokemonService } from '../service/lista-pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {

  pokeInfo: Pokemon = new Pokemon();
  formGroup = new FormGroup({
    pokeName: new FormControl()
  });
  pokeId = 0;

  constructor(
    private listaPokemon: ListaPokemonService,
  ) { }

  ngOnInit(): void {
  }

  submittForm() {
    const pokeNomeNumb = this.formGroup.value.pokeName;
    this.getPoke(pokeNomeNumb);
  }

  getPoke(pokemon: any) {
    this.listaPokemon.getPokemon(pokemon)
      .subscribe(poke => {
        this.pokeInfo = {
          nome: poke.name,
          id: poke.id,
          imagem: poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }
        this.pokeId = poke.id;
      }, (error) => {
        console.log(error.status);
        if (error.status === 404) {
          this.pokeInfo = {
            nome: "Pokemon não encontrado",
            id: 0,
            imagem: './assets/sonic-hedgehog.gif',
          }
        }
        console.log(this.pokeInfo.nome);
      });
  }

  nextPoke() {
    this.pokeId += 1;
    this.getPoke(this.pokeId);
  }

  prevPoke() {
    if (this.pokeId > 0) {
      this.pokeId -= 1;
      this.getPoke(this.pokeId);
    }
  }
}
