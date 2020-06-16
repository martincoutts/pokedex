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
    name;
    stats;

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
        });

        this.service.getItem(this.id).subscribe((response) => {
            this.pokemon = response;
            this.name = this.utilities.capitalizeFirstLetter(this.pokemon.name);
            this.stats = this.pokemon.stats;
            console.log(this.pokemon);
        });
    }
}
