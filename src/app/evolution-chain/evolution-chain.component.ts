import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evolution-chain',
    templateUrl: './evolution-chain.component.html',
    styleUrls: ['./evolution-chain.component.scss'],
})
export class EvolutionChainComponent implements OnInit {
    constructor(private service: PokemonService) {}

    @Input() evolutionChain: any;

    ngOnInit() {
        console.log(this.evolutionChain);
        this.getEvolutionChain();
    }

    getEvolutionChain() {
        const evolutionChain = [];
        this.service
            .getItem(
                null,
                null,
                this['evolutionChain'].chain.evolves_to[0].species.url
            )
            .subscribe((response) => {
                evolutionChain.push(response);
            });
    }
}
