import { Pokemon } from './../shared/poke-info.model';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListaPokemonService } from '../service/lista-pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {

  pokeInfo: Pokemon = new Pokemon();
  formGroupPoke!: FormGroup;
  pokeId = 0;
  favoPokeArray?: Pokemon[] = [];

  constructor(
    private pokemonService: ListaPokemonService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getFavoritePokemon();
    this.formGroupPoke = this.formBuilder.group({
      pokeName: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  submittForm() {
    const pokeNomeNumb = this.formGroupPoke!.value.pokeName.toLowerCase();
    this.getPoke(pokeNomeNumb);
    this.formGroupPoke?.get('pokeName')?.patchValue('');
  }

  getPoke(pokemon: any) {
    this.pokemonService.getPokemon(pokemon)
      .subscribe(poke => {
        this.pokeInfo = {
          nome: poke.name,
          id: poke.id,
          imagem: poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }
        this.pokeId = poke.id;
        this.isFavoritePokemon(this.pokeInfo);
      }, (error) => {
        console.log(error.status);
        if (error.status === 404) {
          this.pokeInfo = {
            nome: "Pokemon não encontrado",
            id: 0,
            imagem: './assets/sonic-hedgehog.gif',
          }
        }
      });
  }

  addOrRemoveFavorite(event: any) {
    if(event.target.checked && !this.pokeInfo.favorito) {
      this.pokeInfo.favorito = true;
      this.favoPokeArray?.push(this.pokeInfo);
    } else {
      this.favoPokeArray?.forEach((poke, index) => {
        if(poke.id === this.pokeInfo.id) {
          this.favoPokeArray?.splice(index, 1);
        }
      })
    }
    this.pokemonService.setPokemon(this.favoPokeArray);
  }

  isFavoritePokemon(pokemon: Pokemon) {
    this.favoPokeArray?.forEach((poke) => {
      if(poke.id === pokemon.id && poke.favorito) {
        this.pokeInfo.favorito = true;
      }
    })
  }

  showArray(){
    console.log(this.favoPokeArray);
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

  getFavoritePokemon() {  
    this.pokemonService.getPokemonObservable().subscribe(poke => {
      this.favoPokeArray = poke;
    })
  }
}
