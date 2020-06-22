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
            const tempArray: any[] = [];
            this.types.map((type) => {
                this.service
                    .getItem(null, null, type.type.url)
                    .subscribe((response) => {
                        tempArray.push(
                            response['damage_relations'].double_damage_from
                        );
                        resolve(tempArray);
                    });
            });
        });
        promise.then((value: any[]) => {
            const tempArray: any[] = value;

            const minArray: any[] =
                tempArray[0].length > 3
                    ? tempArray[0].slice(0, 2)
                    : tempArray[0].slice(0, tempArray[0].length - 1);

            this.minWeaknesses = minArray;
            this.fullWeaknesses = value;
        });
    }
}
