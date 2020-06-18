import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
    constructor(
        private service: PokemonService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    pokemonList: any[] = [];
    slicedPokemonList: any[];
    hasImages = false;

    page: number = 1;
    limit: number = 151;
    maxLimit: number;
    limitReached: boolean = false;

    ngOnInit() {
        this.router.navigate(['/'], {
            queryParams: { page: this.page, limit: this.page * 151 },
        });
        // *Checks if item is in localstorage to prevent excessive fetching of images
        if (localStorage.getItem('pokemonList') !== null) {
            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
            this.hasImages = true;
        } else {
            this.service.getAll().subscribe((response) => {
                this.getImages(response['pokemon_entries']);
            });
        }

        this.route.queryParamMap.subscribe((params) => {
            this.limit = parseInt(params.get('limit'));
            this.maxLimit = this.pokemonList.length;
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
                            avatar: response['sprites'].front_default,
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
            localStorage.setItem(
                'pokemonList',
                JSON.stringify(this.pokemonList)
            );
        });
    }

    loadMore() {
        this.page++;
        const limit: number = this.page * 151;
        limit >= this.maxLimit ? (this.limitReached = true) : null;
        this.router.navigate(['/'], {
            queryParams: { page: this.page, limit },
        });
    }
}
