import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'types',
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
    constructor() {}
    ngOnInit() {
        this.getClass();
    }

    @Input() className: string;
    @Input() type;
    color: string;
    backgroundColor: string;
    typeStyles: Object;

    getClass() {
        switch (this.type.name) {
            case 'grass':
                this.color = 'black';
                this.backgroundColor = '#9bcb50';
                break;
            case 'poison':
                this.color = 'white';
                this.backgroundColor = '#b97fc9';
                break;
            case 'fire':
                this.color = 'white';
                this.backgroundColor = '#FC7D23';
                break;
            case 'water':
                this.color = 'white';
                this.backgroundColor = '#4592C4';
                break;
            case 'flying':
                this.color = 'white';
                this.backgroundColor = '#BDB9B8';
                break;
            case 'bug':
                this.color = 'white';
                this.backgroundColor = '#729F3F';
                break;
            case 'normal':
                this.color = 'white';
                this.backgroundColor = '#A5ACAF';
                break;
            case 'electric':
                this.color = 'black';
                this.backgroundColor = '#EFD535';
                break;
            case 'ground':
                this.color = 'black';
                this.backgroundColor = '#AA9841';
                break;
            case 'fairy':
                this.color = 'black';
                this.backgroundColor = '#FDB8E9';
                break;
            case 'fighting':
                this.color = 'white';
                this.backgroundColor = '#D56723';
                break;
            case 'psychic':
                this.color = 'white';
                this.backgroundColor = '#F367B9';
                break;
            case 'rock':
                this.color = 'white';
                this.backgroundColor = '#A38D21';
                break;
            case 'steel':
                this.color = 'black';
                this.backgroundColor = '#9EB7B8';
                break;
            case 'ice':
                this.color = 'black';
                this.backgroundColor = '#51C3E7';
                break;
            case 'ghost':
                this.color = 'white';
                this.backgroundColor = '#7B62A3';
                break;
            case 'dragon':
                this.color = 'white';
                this.backgroundColor = '#F16D56';
                break;
        }

        this.typeStyles = {
            color: this.color,
            'background-color': this.backgroundColor,
        };
        console.log(this.typeStyles);
    }
}
