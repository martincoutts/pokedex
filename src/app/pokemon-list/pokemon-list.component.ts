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

    page = 1;
    limit = 151;
    maxLimit: number;
    limitReached = false;

    ngOnInit() {
        this.router.navigate(['/'], {
            queryParams: { page: this.page, limit: this.page * 151 },
        });
        // *Checks if item is in localstorage to prevent excessive fetching of images
        if (localStorage.getItem('pokemonList') !== null) {
            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

            this.hasImages = true;
        } else {
            this.service.getAll().subscribe((response: any) => {
                this.pokemonList = response.pokemon_entries;

                this.getPokemonList();
            });
        }

        this.route.queryParamMap.subscribe((params) => {
            this.limit = parseInt(params.get('limit'), 10);
            this.maxLimit = this.pokemonList.length;
        });
    }

    getPokemonList() {
        this.pokemonList.sort((a, b) => a.entry_number - b.entry_number);

        this.hasImages = true;
        localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList));
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
}
