import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pokemon-image',
    templateUrl: './pokemon-image.component.html',
    styleUrls: ['./pokemon-image.component.scss'],
})
export class PokemonImageComponent implements OnInit {
    constructor() {}
    @Input() pokemon?;
    @Input() className?: string;
    @Input() imageURL?: string;
    @Input() additionalClasses = '';
    id: number;

    avatarUrl: string;
    altText: string;

    ngOnInit() {
        this.getImage();
    }

    getImage() {
        if (this.pokemon.entry_number) {
            this.id = this.pokemon.entry_number;
        } else if (this.pokemon.id) {
            this.id = this.pokemon.id;
        } else if (this.pokemon.name) {
            this.id = this.pokemon.name;
        }

        this.altText = this.pokemon.pokemon_species
            ? `${this.pokemon.pokemon_species.name} logo`
            : 'pokemon-avatar';

        this.avatarUrl = this.imageURL
            ? this.imageURL
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id.toString()}.png`;
    }
}
