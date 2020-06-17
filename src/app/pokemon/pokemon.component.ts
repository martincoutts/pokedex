import { UtilitiesService } from './../services/utilities.service';

import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
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
        private utilities: UtilitiesService,
        private location: Location
    ) {}
    id;
    pokemon;
    pokemonSpecies;
    name;
    evolutionChainResponse;

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
        });

        this.service.getItem(this.id, 'pokemon').subscribe((response) => {
            this.pokemon = response;
            this.name = this.utilities.capitalizeFirstLetter(this.pokemon.name);
        });

        this.service
            .getItem(this.id, 'pokemon-species')
            .subscribe((response) => {
                this.pokemonSpecies = response;

                this.service
                    .getItem(
                        this.id,
                        'evolution-chain',
                        response['evolution_chain'].url
                    )
                    .subscribe((response) => {
                        this.evolutionChainResponse = response;
                    });
            });
    }

    goBack() {
        this.location.back();
    }
}
