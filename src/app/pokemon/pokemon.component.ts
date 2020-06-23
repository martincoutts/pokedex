import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private service: PokemonService,
        public router: Router
    ) {}
    id: number;
    pokemon: any;
    pokemonList: any[];
    pokemonSpecies;
    evolutionChainResponse;
    dataLoaded = false;
    loadingRoute = false;

    ngOnInit() {
        this.getData();

        // *Checks if item is in localstorage to prevent excessive fetching of images
        if (localStorage.getItem('pokemonList') !== null) {
            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.service.getAll().subscribe((response: any) => {
                this.pokemonList = response.pokemon_entries;
                this.getPokemonList();
            });
        }
    }

    getPokemonList() {
        this.pokemonList.sort((a, b) => a.entry_number - b.entry_number);

        localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList));
    }

    getData(id?: number) {
        id
            ? (this.id = id)
            : this.route.paramMap.subscribe((params) => {
                  this.id = parseInt(params.get('id'), 10);
              });
        const promise = new Promise((resolve, reject) => {
            this.dataLoaded = false;
            this.service
                .getItem(this.id, 'pokemon')
                .subscribe((response: any) => {
                    this.pokemon = response;

                    resolve('Success');
                });
        });
        promise.then((value) => {
            this.service
                .getItem(this.id, 'pokemon-species')
                .subscribe((responseA: any) => {
                    this.pokemonSpecies = responseA;

                    this.service
                        .getItem(
                            this.id,
                            'evolution-chain',
                            responseA.evolution_chain.url
                        )
                        .subscribe((responseB: any) => {
                            this.evolutionChainResponse = responseB;
                            this.dataLoaded = true;
                        });
                });
        });
    }

    navigateToPokemon(id: number) {
        this.getData(id);
        this.router.navigate(['pokemon', id]);
    }

    receiveClickedOnEvolution($event) {
        this.navigateToPokemon($event);
    }

    goHome() {
        const promise = new Promise((resolve, reject) => {
            this.loadingRoute = true;
            resolve('Complete');
        });

        promise.then((val) => {
            this.router.navigate(['/'], {
                queryParams: { page: 1, limit: 151 },
            });
        });
    }
}
