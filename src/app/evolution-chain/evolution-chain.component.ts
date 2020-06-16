import { UtilitiesService } from './../utilities.service';
import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evolution-chain',
    templateUrl: './evolution-chain.component.html',
    styleUrls: ['./evolution-chain.component.scss'],
})
export class EvolutionChainComponent implements OnInit {
    constructor(
        private service: PokemonService,
        private utilities: UtilitiesService
    ) {}
    cellData: any[] = [];
    sortedCellData: any[];

    @Input() evolutionChain: any;

    ngOnInit() {
        this.getEvolutionChain();
    }

    getEvolutionChain() {
        const evolutionChain = [this.evolutionChain.chain];

        let count: number = 0;
        let evolutionChainComplete = false;

        for (let i = 0; i <= evolutionChain.length; i++) {
            for (let [key, value] of Object.entries(evolutionChain[count])) {
                if (key === 'evolves_to' && value['length'] > 0) {
                    evolutionChain.push(value[0]);
                    count++;
                    evolutionChainComplete = true;
                }
            }
        }

        if (evolutionChainComplete) {
            evolutionChain.map((object) => {
                this.service
                    .getItem(
                        null,
                        null,
                        `https://pokeapi.co/api/v2/pokemon/${object.species.name}/`
                    )
                    .subscribe((response) => {
                        const { name, sprites, types, order } = response;

                        const cellData = {
                            name: this.utilities.capitalizeFirstLetter(name),
                            avatar: sprites.front_default,
                            types,
                            order,
                        };

                        this.cellData.push(cellData);
                        // * Makes sure evolution chain renders in correct order
                        this.sortedCellData = this.cellData.sort(function (
                            a,
                            b
                        ) {
                            return a.order - b.order;
                        });
                    });
            });
        }
    }
}
