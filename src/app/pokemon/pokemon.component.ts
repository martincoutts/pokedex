import { UtilitiesService } from './../utilities.service';

import { CommonModule } from '@angular/common';
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
        private utilities: UtilitiesService
    ) {}
    id;
    pokemon;
    pokemonSpecies;
    name;

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
                        response.evolution_chain.url
                    )
                    .subscribe((response) => {
                        this.evolutionChainResponse = response;
                        console.log(this.evolutionChainResponse);
                    });
            });
    }

    // TODO break out into new component
    // getEvolutionChain(){
    //   let evolvesTo this.service.getItem(null, null, this.evolutionChainResponse.evolves_to.species.url);

    // }
}
