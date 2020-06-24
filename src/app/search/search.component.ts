import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor() {}
    value: string;

    @Output() pokemonSearch = new EventEmitter<string>();
    @Output() pokemonSearchClear = new EventEmitter<boolean>();

    ngOnInit(): void {}

    userSearch(input: string) {
        this.pokemonSearch.emit(input);
    }

    clearSearch() {
        this.pokemonSearchClear.emit(true);
        this.value = '';
    }
}
