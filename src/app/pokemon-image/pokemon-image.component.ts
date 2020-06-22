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
    @Input() className: string;
    id: number;

    avatarUrl: string;

    ngOnInit() {
        this.getImage();
        console.log('className', this.className);
    }

    getImage() {
        this.id = this.pokemon.entry_number || this.pokemon.id;
        this.avatarUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
    }
}
