import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sort-dropdown',
    templateUrl: './sort-dropdown.component.html',
    styleUrls: ['./sort-dropdown.component.scss'],
})
export class SortDropdownComponent implements OnInit {
    constructor() {}

    selected;

    @Input() sortOptions: any[];
    @Input() disableSort: boolean;
    @Output() sortSelect = new EventEmitter<number>();

    ngOnInit(): void {}

    handleChange($event) {
        this.sortSelect.emit($event.value);
    }
}
