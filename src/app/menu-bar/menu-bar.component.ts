import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
    constructor() {}

    @Output() menuChange = new EventEmitter<object>();

    ngOnInit(): void {}

    receiveSearch(value: string) {
        this.menuChange.emit({ searchValue: value });
    }

    receivePokemonSearchClear($event) {
        this.menuChange.emit({ searchValue: '' });
    }
}
