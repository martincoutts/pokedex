import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
    constructor(private service: PokemonService) {}
    pokemonList: any[] = [];

    hasImages = false;

    ngOnInit() {
        this.service.getAll().subscribe((response) => {
            this.getImages(response.pokemon_entries);
        });
    }

    getImages(value) {
        const fetchPromise = new Promise((resolve, reject) => {
            value.map((pokemon, index) => {
                this.service
                    .getItem(pokemon.entry_number, 'pokemon')
                    .subscribe((response) => {
                        const pokemonObject = {
                            pokemon,
                            avatar: response.sprites.front_default,
                        };

                        this.pokemonList.push(pokemonObject);
                        if (this.pokemonList.length === value.length) {
                            resolve('Success');
                        }
                    });
            });
        });
        fetchPromise.then(() => {
            this.pokemonList.sort(
                (a, b) => a.pokemon.entry_number - b.pokemon.entry_number
            );
            this.hasImages = true;
        });
    }
}
