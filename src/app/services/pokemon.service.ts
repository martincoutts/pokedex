import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PokemonService extends DataService {
  constructor(http: HttpClient) {
    super("https://pokeapi.co/api/v2/", http);
  }
  allPokemon: any[];
  pokemon;
  pokemonImageUrl;

  selectPokemon(pokemon) {
    this.pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  }
}
