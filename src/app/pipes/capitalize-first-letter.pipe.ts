import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeFirstLetter',
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): unknown {
        return value && value[0].toUpperCase() + value.slice(1);
    }
}
