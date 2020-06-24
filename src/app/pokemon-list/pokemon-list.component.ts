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
    pokemonListFull: any[] = [];
    filteredPokemonList: any[];
    slicedPokemonList: any[];
    hasImages = false;

    searchValue: string;

    page = 1;
    limit = 151;
    maxLimit: number;
    limitReached = false;

    ngOnInit() {
        this.router.navigate(['/'], {
            queryParams: { page: this.page, limit: this.page * 151 },
        });
        // *Checks if item is in localstorage to prevent excessive fetching of images
        if (localStorage.getItem('pokemonListFull') !== null) {
            this.pokemonListFull = JSON.parse(
                localStorage.getItem('pokemonListFull')
            );
            this.filteredPokemonList = JSON.parse(
                localStorage.getItem('pokemonListFull')
            );

            this.hasImages = true;
        } else {
            this.service.getAll().subscribe((response: any) => {
                this.pokemonListFull = response.pokemon_entries;
                this.filteredPokemonList = response.pokemon_entries;

                this.getPokemonList();
            });
        }

        this.filterPokemon();

        this.route.queryParamMap.subscribe((params) => {
            this.limit = parseInt(params.get('limit'), 10);
            this.maxLimit = this.pokemonListFull.length;
        });
    }

    getPokemonList() {
        this.pokemonListFull.sort((a, b) => a.entry_number - b.entry_number);

        this.hasImages = true;
        localStorage.setItem(
            'pokemonList',
            JSON.stringify(this.pokemonListFull)
        );
    }

    loadMore() {
        this.page++;
        const limit: number = this.page * 151;
        // tslint:disable-next-line: no-unused-expression
        limit >= this.maxLimit ? (this.limitReached = true) : null;
        this.router.navigate(['/'], {
            queryParams: { page: this.page, limit },
        });
    }

    receiveMenuChange($event) {
        this.searchValue = $event.searchValue;
        this.filterPokemon();
    }

    filterPokemon() {
        const promise = new Promise((resolve, reject) => {
            if (this.searchValue.length && this.searchValue.length <= 2) {
                this.hasImages = false;
                console.log('less than 3', this.searchValue);
            } else {
                const filteredList = this.pokemonListFull.filter((pokemon) =>
                    pokemon.pokemon_species.name.includes(this.searchValue)
                );
                resolve(filteredList);
            }
        });

        promise.then((value: any[]) => {
            this.filteredPokemonList =
                value.length && this.searchValue !== ''
                    ? value
                    : this.pokemonListFull;
            this.hasImages = true;
        });
    }
}
