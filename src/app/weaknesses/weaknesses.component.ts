import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'weaknesses',
    templateUrl: './weaknesses.component.html',
    styleUrls: ['./weaknesses.component.scss'],
})
export class WeaknessesComponent implements OnInit {
    constructor(private service: PokemonService) {}

    @Input() types: any[];
    minWeaknesses: any[] = [];
    fullWeaknesses: any[] = [];
    isVisible = false;

    ngOnInit() {
        this.getWeaknesses();
    }

    getWeaknesses() {
        const promise = new Promise((resolve, reject) => {
            const fullValue: any[] = [];
            const minValue: any[] = [];
            this.types.map((type, index) => {
                this.service
                    .getItem(null, null, type.type.url)
                    .subscribe((response: any) => {
                        fullValue.push(
                            response.damage_relations.double_damage_from
                        );
                        minValue.push(
                            response.damage_relations.double_damage_from[0]
                        );
                        resolve({ fullValue, minValue });
                    });
            });
        });
        promise.then((value: any) => {
            this.minWeaknesses = value.minValue;
            this.fullWeaknesses = value.fullValue;
        });
    }
}
