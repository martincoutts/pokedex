import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, HostListener } from '@angular/core';

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

    searchValue: string = null;
    clearSearch = false;
    sortOptions: any[] = [
        { text: 'Ascending 1 - 10', value: 1 },
        { text: 'Descending 10 - 1', value: 2 },
        { text: 'Ascending A - Z', value: 3 },
        { text: 'Ascending Z - A', value: 4 },
    ];
    sortDisabled = false;
    showScrollButton = false;

    page = 1;
    limit = 151;
    maxLimit: number;
    limitReached = false;

    @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
        if ($event.srcElement.documentElement.scrollTop > 7000) {
            this.showScrollButton = true;
        } else {
            this.showScrollButton = false;
        }
    }

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

    sortList(sortValue: number) {
        if (sortValue === 1) {
            this.pokemonListFull.sort(
                (a, b) => a.entry_number - b.entry_number
            );
        } else if (sortValue === 2) {
            this.pokemonListFull.sort(
                (a, b) => b.entry_number - a.entry_number
            );
        } else if (sortValue === 3) {
            this.pokemonListFull.sort((a, b) =>
                a.pokemon_species.name.localeCompare(b.pokemon_species.name)
            );
        } else if (sortValue === 4) {
            this.pokemonListFull.sort((a, b) =>
                b.pokemon_species.name.localeCompare(a.pokemon_species.name)
            );
        }
    }

    scrolltToTop() {
        window.scrollTo(0, 0);
    }

    receiveMenuChange($event) {
        if ($event.clearSearch) {
            this.clearSearch = true;
            // this.filteredPokemonList = this.pokemonListFull;
            this.sortDisabled = false;
            this.filterPokemon();
        }
        if ($event.searchValue) {
            this.clearSearch = false;
            this.searchValue = $event.searchValue;
            this.sortDisabled = true;
            this.filterPokemon();
        }

        if ($event.sortValue) {
            this.sortList($event.sortValue);
        }

        this.scrolltToTop();
    }

    filterPokemon() {
        const promise = new Promise((resolve, reject) => {
            if (this.clearSearch || !this.searchValue.length) {
                resolve(this.pokemonListFull);
            }
            if (this.searchValue.length && this.searchValue.length < 3) {
                this.hasImages = false;
            }
            if (this.clearSearch || this.searchValue.length >= 3) {
                const filteredList = this.pokemonListFull.filter((pokemon) =>
                    pokemon.pokemon_species.name.includes(this.searchValue)
                );

                resolve(filteredList);
            }
        });

        promise.then((value: any[]) => {
            this.filteredPokemonList =
                this.searchValue !== null || this.searchValue !== ''
                    ? value
                    : this.pokemonListFull;
            this.hasImages = true;
        });
    }
}
