import { PokemonService } from "./../services/pokemon.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  constructor(private service: PokemonService) {}
  pokemonList: any[];

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      this.pokemonList = response.pokemon_entries;
      console.log(this.pokemonList);
    });
  }
}
