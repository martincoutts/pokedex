import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    constructor() {}

    @Input() className: string;
    @Input() diameter: string;

    spinnerDiamater;

    ngOnInit() {
        this.spinnerDiamater = this.diameter ? this.diameter : '100';
    }
}
