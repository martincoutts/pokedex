import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
    constructor() {}

    @Input() menuOptions: any[];
    @Input() disableSort: boolean;
    @Output() menuChange = new EventEmitter<object>();

    ngOnInit(): void {}

    receiveSearch(value: string) {
        this.menuChange.emit({ searchValue: value });
    }

    receivePokemonSearchClear($event) {
        this.menuChange.emit({ clearSearch: true });
    }

    receivesortSelect($event) {
        this.menuChange.emit({ sortValue: $event });
    }
}
