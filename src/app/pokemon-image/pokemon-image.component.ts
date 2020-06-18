import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pokemon-image',
    templateUrl: './pokemon-image.component.html',
    styleUrls: ['./pokemon-image.component.scss'],
})
export class PokemonImageComponent implements OnInit {
    constructor(private service: PokemonService) {}
    @Input() pokemon;
    id: number;

    avatarUrl: string;

    ngOnInit() {
        this.getImage();
    }

    getImage() {
        this.id = this.pokemon.entry_number;
        this.avatarUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
    }
}
