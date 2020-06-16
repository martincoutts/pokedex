import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    constructor() {}

    capitalizeFirstLetter(s: string) {
        return s && s[0].toUpperCase() + s.slice(1);
    }
}
