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
    pokemonList: any[];
    imageList: any[] = [];
    gotImages: boolean = false;

    ngOnInit() {
        this.service.getAll().subscribe((response) => {
            // tslint:disable-next-line: no-string-literal
            this.pokemonList = response['pokemon_entries'];
            this.getImages(response['pokemon_entries']);
        });
    }

    getImages(value) {
        const fetchPromise = new Promise((resolve, reject) => {
            value.map((pokemon, index) => {
                this.service
                    .getItem(pokemon['entry_number'], 'pokemon')
                    .subscribe((response) => {
                        this.imageList.push(response['sprites'].front_default);
                        if (this.pokemonList.length === this.imageList.length) {
                            resolve('Success');
                        }
                    });
            });
        });
        fetchPromise.then(() => {
            this.gotImages = true;
        });
    }
}
