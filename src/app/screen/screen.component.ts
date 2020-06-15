import { PokemonService } from "./../services/pokemon.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "screen",
  templateUrl: "./screen.component.html",
  styleUrls: ["./screen.component.scss"],
})
export class ScreenComponent implements OnInit {
  constructor(private service: PokemonService) {}
  pokemon: any;
  imageUrl: string;

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      this.service.allPokemon = response.pokemon_entries;
    });

    this.service.getItem(1).subscribe((response) => {
      this.service.pokemon = response;
      this.service.selectPokemon(response);
      this.imageUrl = this.service.pokemonImageUrl;
    });
  }
}
