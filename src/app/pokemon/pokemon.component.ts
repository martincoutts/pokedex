import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private service: PokemonService,

        private router: Router
    ) {}
    id;
    pokemon;
    pokemonList;
    pokemonSpecies;
    evolutionChainResponse;
    dataLoaded: boolean = false;

    ngOnInit() {
        this.getData();
        // *Checks if item is in localstorage to prevent excessive fetching of images
        if (localStorage.getItem('pokemonList') !== null) {
            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
            console.log('pokemonList', this.pokemonList);
        } else {
            this.service.getItem(this.id, 'pokemon').subscribe((response) => {
                this.pokemonList = response;
                console.log('pokemonList', this.pokemonList);
            });
        }
    }

    getData(id?: number) {
        id
            ? (this.id = id)
            : this.route.paramMap.subscribe((params) => {
                  this.id = params.get('id');
              });
        const promise = new Promise((resolve, reject) => {
            this.dataLoaded = false;
            this.service.getItem(this.id, 'pokemon').subscribe((response) => {
                this.pokemon = response;
                console.log('this.pokemon', this.pokemon);
                resolve('Success');
            });
        });
        promise.then((value) => {
            this.service
                .getItem(this.id, 'pokemon-species')
                .subscribe((response) => {
                    this.pokemonSpecies = response;
                    console.log('this.pokemonSpecies', this.pokemonSpecies);

                    this.service
                        .getItem(
                            this.id,
                            'evolution-chain',
                            response['evolution_chain'].url
                        )
                        .subscribe((response) => {
                            this.evolutionChainResponse = response;
                            this.dataLoaded = true;
                        });
                });
        });
    }

    navigateToPokemon(id: number) {
        this.getData(id);
        this.router.navigate(['pokemon', id]);
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
